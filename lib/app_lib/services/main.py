import json
from abc import abstractmethod, ABC
from asyncio import iscoroutinefunction
from typing import (
    TYPE_CHECKING,
    Any,
    Callable,
    Dict,
    Generic,
    List,
    Type,
    TypeVar,
    Union
)

from aio_pika import IncomingMessage
from app_lib.amqp_routes import CONTROLLER, CONTROLLER_EXCHANGE

from app_lib.log import get_logger
from app_lib.messages.message import Message
from logging import Logger
from app_lib.classes.base import QueueParams, ExchangeParams

if TYPE_CHECKING:
    from markets_lib.connections import Connections  # NOQA


T = TypeVar('T')


__all__ = [
    'BaseService',
    'Service'
]


class BaseService(Generic[T]):
    _register: Dict[str, Type[object]] = {}
    logger: 'Logger'
    conn: 'Connections'

    @abstractmethod
    def get_exchange_params(self) -> 'ExchangeParams':
        ...

    @abstractmethod
    def get_queue_params(self) -> 'QueueParams':
        ...

    @abstractmethod
    def get_routing_name(self, *args, **kwargs) -> str:
        return ''

    @abstractmethod
    def get_message(self, *args, **kwargs) -> 'Message':
        ...

    @abstractmethod
    def get_heartbeat_message(self) -> 'Message':
        ...

    def get_empty_message(self) -> 'Message':
        message = Message({})
        message.routing_key = self.get_routing_name()
        message.exchange = self.get_exchange_params().name
        return message

    def setup(self, conn: 'Connections', create_queue: bool = True):
        self.conn = conn
        if create_queue:
            conn.create_queue(
                queue_params=self.get_queue_params(),
                exchange_params=self.get_exchange_params(),
                routing_key=self.get_routing_name(),
            )

    def send(self, *args, **kwargs):
        message = self.get_message(*args, **kwargs)
        self.conn.send(message)

    def heartbeat(self):
        message = self.get_heartbeat_message()
        self.conn.send(message)

    def parse(self, body: Union[bytes, IncomingMessage]) -> T:
        if isinstance(body, IncomingMessage):
            body = body.body
        data = json.loads(body.decode())
        meta = Message.pop_meta(data)
        self.logger.debug('Parse meta: %s', meta.t)
        return BaseService._register[meta.t](**data)

    def consume(self, callback: Callable[..., Any]):
        logger = self.logger
        logger.info('Start consuming queue[%s]', self.get_queue_params().name)
        parse = self.parse

        async def async_consumer(_: 'IncomingMessage'):
            instance = parse(_)
            logger.debug('Incoming message: %s', instance)
            await callback(instance, _)

        def sync_consumer(_: bytes, message_ack: Callable):
            instance = parse(_)
            logger.debug('Incoming message: %s', instance)
            callback(instance, message_ack)

        consumer = async_consumer if iscoroutinefunction(callback) else sync_consumer
        return self.conn.consuming(self.get_queue_params(), consumer)


class Service(BaseService, ABC):

    def __init__(self,
                 name: 'str',
                 exchange_name: 'str',
                 queue_name: 'str',
                 routing_name: 'str',
                 types: List[Type[object]],
                 **kwargs):
        super().__init__(**kwargs)

        self.name = name
        self.exchange_name = exchange_name
        self.queue_name = queue_name
        self.routing_name = routing_name

        self.logger = get_logger(f'service.{self.name}')

        for t in types:
            self._register[t.__name__] = t

    def get_exchange_params(self) -> 'ExchangeParams':
        return ExchangeParams(name=self.exchange_name)

    def get_queue_params(self) -> 'QueueParams':
        return QueueParams(name=self.queue_name)

    def get_routing_name(self) -> str:
        return self.routing_name

    def send_to_controller(self, *args):
        message = Message.from_dataclass(args[0])
        message.routing_key = CONTROLLER
        message.exchange = CONTROLLER_EXCHANGE
        self.conn.send(message)

    def send_to(self, *args):
        message = Message.from_dataclass(args[0])
        message.routing_key = args[1]
        message.exchange = args[2]
        self.conn.send(message)
