import json
from abc import abstractmethod
from asyncio import Event
from collections import defaultdict
from queue import Queue
from typing import (
    TYPE_CHECKING,
    Any,
    Awaitable,
    Callable,
    Dict,
    List,
    NoReturn,
    Optional,
    Tuple,
    Union,
)

from aio_pika import Message as AioMessage, connect_robust
from pika import BasicProperties, BlockingConnection, URLParameters, exceptions
from app_lib.log import get_logger

if TYPE_CHECKING:
    import asyncio  # NOQA
    from pika.spec import Basic, BasicProperties  # NOQA
    from messages import Message
    from pika.channel import Channel
    from aio_pika import (  # NOQA
        Exchange as AioExchange,
        RobustConnection,
        IncomingMessage,
    )
    from app_lib.classes import QueueParams, ExchangeParams


__all__ = ['AsyncConnection', 'SyncConnection', 'QueueConnection']


logger = get_logger(__name__)
log = logger.info
LOG_EXCHANGE = 'Declare exchange [%s]'
LOG_QUEUE = 'Declare queue [%s]'
LOG_BIND = 'Bind queue [%s] to [%s] - [%s]'

# TODO: no when setup queue channel auto created, but not used, need
#  improve implementation for reuse channel if just setup.


class BaseConnection:
    def __init__(self, url: Optional[str] = None):
        self.url = url
        self._connection = None

    @abstractmethod
    def connect(self) -> NoReturn:
        ...

    @abstractmethod
    def send(self, msg: 'Message') -> NoReturn:
        ...

    @abstractmethod
    def consuming(
        self, queue_params: 'QueueParams', callback: Callable[[Any], Any]
    ) -> NoReturn:
        ...

    @abstractmethod
    def create_queue(
        self,
        queue_params: 'QueueParams',
        exchange_params: 'ExchangeParams',
        routing_key: str = '',
    ) -> NoReturn:
        ...


class AsyncConnection(BaseConnection):

    _connection: 'RobustConnection'
    _exchanges: Dict[str, 'AioExchange']

    def __init__(
        self, *args, loop: Optional['asyncio.AbstractEventLoop'] = None, **kwargs
    ):
        super().__init__(*args, **kwargs)
        self._loop = loop
        self._exchanges = {}
        self._ready_event = Event()

    async def connect(self):
        self._connection = await connect_robust(self.url)

    def send(self, msg: 'Message'):
        exchange = self._exchanges[msg.exchange]
        self._loop.create_task(
            exchange.publish(
                AioMessage(msg.bytes(), content_type='application/json'),
                routing_key=msg.routing_key,
            )
        )

    async def consuming(
        self,
        queue_params: 'QueueParams',
        callback: Callable[['IncomingMessage'], Awaitable],
    ):
        ch = await self._connection.channel()
        queue_name = queue_params.name
        log(LOG_QUEUE, queue_name)
        queue = await ch.declare_queue(**queue_params.dict())
        log('Start consume [%s]', queue_name)
        await queue.consume(callback)

    def create_queue(
        self,
        queue_params: 'QueueParams',
        exchange_params: 'ExchangeParams',
        routing_key: str = '',
    ):
        assert self._connection, 'Connection must be installed'
        connection = self._connection
        exchanges = self._exchanges
        queue_name = queue_params.name
        exchange_name = exchange_params.name
        ready_event = self._ready_event

        async def _():

            ch = await connection.channel()
            exchange = exchanges.get(exchange_name)

            if not exchange:
                log(LOG_EXCHANGE, exchange_name)
                exchange = await ch.declare_exchange(**exchange_params.dict())
                exchanges[exchange_name] = exchange

            log(LOG_QUEUE, queue_name)
            queue = await ch.declare_queue(**queue_params.dict())

            log(LOG_BIND, queue_name, exchange_name, routing_key)
            await queue.bind(exchange, routing_key)
            ready_event.set()

        self._loop.create_task(_())

    async def wait_ready(self):
        """
        This method notify when exchange was declared, queue creating and
        binding
        """
        return await self._ready_event.wait()

    async def close(self):
        return await self._connection.close()


SYNC_BASIC_PROPERTIES = BasicProperties(content_type='application/json')
SYNC_TRY_COUNT = 3


class SyncConnection(BaseConnection):

    _channel: 'Channel'
    _connection: 'BlockingConnection'

    def connect(self):
        self._connection = BlockingConnection(self.url and URLParameters(self.url))
        self._channel = self._connection.channel()

    def _exec_method(self, func, *args, **kwargs):
        for i in range(0, SYNC_TRY_COUNT):
            try:
                func(*args, **kwargs)
                break
            except (exceptions.ChannelClosed, exceptions.ChannelWrongStateError) as e:
                logger.error('Channel error: %s, try reconnect and exec #%s', e, i + 1)
                self._channel = self._connection.channel()
                continue
            except (
                exceptions.ConnectionClosed,
                exceptions.StreamLostError,
                ConnectionError,
                ConnectionResetError,
                FileNotFoundError,
            ) as e:
                # TODO: FileNotFoundError raise in Gunicorn worker, need more working
                #  implementation
                logger.error(
                    'Connection error: %s, try reconnect and exec #%s', e, i + 1
                )
                self.connect()
                continue
            except Exception as e:
                logger.exception('Unhandled error %s', e)
                self.connect()
                continue

    def _publish(self, *args, **kwargs):
        self._channel.basic_publish(*args, **kwargs)

    def send(self, msg: 'Message'):
        self._exec_method(
            self._publish,
            msg.exchange,
            msg.routing_key,
            msg.bytes(),
            SYNC_BASIC_PROPERTIES,
        )

    def consuming(self, queue_params: 'QueueParams', callback: Callable[[bytes], Any]):
        def _on_message(
            channel: 'Channel',
            method_frame: 'Basic.Deliver',
            _: 'BasicProperties',
            body: bytes,
        ):
            def message_ack():
                channel.basic_ack(delivery_tag=method_frame.delivery_tag)
            try:
                callback(body, message_ack)
            except Exception as e:
                logger.exception('Some thing wrong in consuming: %s', e)

        while True:
            logger.debug('Try to connect')
            self.connect()
            self._channel.basic_consume(queue_params.name, _on_message)
            try:
                logger.debug('Start consuming')
                self._channel.start_consuming()
            except exceptions.ConnectionClosed:
                logger.debug('Connection closed')
                continue
            except KeyboardInterrupt:
                self._channel.stop_consuming()

            self._channel.close()
            break

    def _create_queue(
        self,
        queue_params: 'QueueParams',
        exchange_params: 'ExchangeParams',
        routing_key: str = '',
    ):
        assert self._channel, 'Channel must be installed'
        queue_name = queue_params.name
        exchange_name = exchange_params.name
        exchange_type: str = exchange_params.type.value

        log(LOG_EXCHANGE, exchange_name)
        self._channel.exchange_declare(
            exchange=exchange_name,
            durable=exchange_params.durable,
            exchange_type=exchange_type,
        )

        log(LOG_QUEUE, queue_name)
        params = queue_params.dict()
        params.pop('name')
        self._channel.queue_declare(queue_name, **params)

        log(LOG_BIND, queue_name, exchange_name, routing_key)
        self._channel.queue_bind(queue_name, exchange_name, routing_key)

    def create_queue(
        self,
        queue_params: 'QueueParams',
        exchange_params: 'ExchangeParams',
        routing_key: str = '',
    ):
        self._exec_method(
            self._create_queue, queue_params, exchange_params, routing_key
        )


class QueueConnection(BaseConnection):
    """This class using only for test"""

    _exchanges: Dict[Tuple[str, str], List[Queue]]
    _queues: Dict[str, Queue]

    def __init__(self, url: Optional[str] = None):
        super().__init__(url)
        self._exchanges = defaultdict(list)
        self._queues = defaultdict(Queue)

    def connect(self) -> NoReturn:
        ...

    def send(self, msg: 'Message') -> NoReturn:
        for queue in self._exchanges[(msg.exchange, msg.routing_key)]:
            queue.put_nowait(msg.string())

    def consuming(
        self, queue_params: 'QueueParams', callback: Callable[[Any], Any]
    ) -> Callable:
        queue = self._queues[queue_params.name]

        def message_ack():
            ...

        def _():
            string = queue.get_nowait()
            data = json.loads(string)
            callback(string.encode(), message_ack)
            return data

        return _

    def create_queue(
        self,
        queue_params: 'QueueParams',
        exchange_params: 'ExchangeParams',
        routing_key: str = '',
    ):
        q = Queue()
        queue_name = queue_params.name
        exchange_name = exchange_params.name
        self._exchanges[(exchange_name, routing_key)].append(q)
        self._queues[queue_name] = q


Connections = Union[AsyncConnection, SyncConnection, QueueConnection]

