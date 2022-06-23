from typing import Optional

from aio_pika import ExchangeType
from app_lib.log import get_logger

from app_lib.classes.base import ExchangeParams, QueueParams
from app_lib.classes.notification import Notification
from app_lib.messages.message import Message
from app_lib.services.main import BaseService

__all__ = [
    'NotificationService',
]

EXCHANGE = 'notifications'
TASK_ROUTING_KEY = 'tasks'


class NotificationService(BaseService):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)

        self._queue_params = QueueParams(
            auto_delete=True, durable=False, exclusive=True
        )

        self.logger = get_logger(f'notifications')

        self._register[Notification.__name__] = Notification

    def get_exchange_params(self) -> 'ExchangeParams':
        return ExchangeParams(name=EXCHANGE, type=ExchangeType.FANOUT)

    def get_queue_params(self) -> 'QueueParams':
        return self._queue_params

    def get_routing_name(self) -> str:
        return TASK_ROUTING_KEY

    def get_message(
        self, t: Notification, server_name: Optional[str] = None
    ) -> 'Message':
        message = Message.from_dataclass(t)
        message.routing_key = self.get_routing_name()
        message.exchange = self.get_exchange_params().name
        return message

    def get_heartbeat_message(self) -> 'Message':
        message = Message({})
        message.routing_key = self.get_routing_name()
        message.exchange = self.get_exchange_params().name
        return message
