import asyncio
import os
from collections import defaultdict
from typing import TYPE_CHECKING

from tornado.ioloop import IOLoop
from tornado.web import Application
from tornado.websocket import WebSocketError, WebSocketHandler

from app_lib import DEBUG
from app_lib.log import get_logger
from app_lib.connections import AsyncConnection
from app_lib.classes.notification import Notification
from app_lib.services.notification_service import NotificationService

if TYPE_CHECKING:
    from aio_pika import IncomingMessage

logger = get_logger('notifications')
APP_SERVICE_URL = os.environ.get('APP_SERVICE_URL', None)
PORT = int(os.environ.get('APP_NOTIFICATIONS_PORT', 8080))


class ConnectionRegister:
    def __init__(self, service: 'NotificationService'):
        self._connections = defaultdict(list)
        self.service = service

    def register(self, user_id: int, handler: WebSocketHandler):
        self._connections[user_id].append(handler)
        logger.debug('Register success for user[%s]', user_id)

    def unregister(self, user_id: int, handler: WebSocketHandler):
        try:
            conns = self._connections[user_id]
            conns.pop(conns.index(handler))
            if not len(conns):
                del self._connections[user_id]
        except ValueError:
            pass
        logger.debug('Unregister user[%s]', user_id)

    async def callback(self, notification: 'Notification', message: 'IncomingMessage'):
        await message.ack()
        connections = self._connections[notification.user_id]
        data = notification.dict()
        logger.debug('Receive message [%s]', data)
        for conn in connections:
            try:
                conn.write_message(data)
            except WebSocketError:
                logger.exception(
                    'Send error for task[%s] and user[%s]',
                    notification.user_id
                )


class WebSocket(WebSocketHandler):
    user_id: int

    @property
    def register(self) -> 'ConnectionRegister':
        return self.application.settings['register']

    def check_origin(self, origin):
        return True

    def open(self, user_id: str):
        logger.debug('Connection open %s', user_id)
        self.user_id = int(user_id)
        self.register.register(self.user_id, self)

    def on_message(self, message):
        pass

    def on_close(self):
        logger.debug('Connection close %s', self.user_id)
        self.register.unregister(self.user_id, self)


async def consuming(r: 'ConnectionRegister'):
    conn = AsyncConnection(url=APP_SERVICE_URL, loop=asyncio.get_running_loop())
    await conn.connect()
    r.service.setup(conn)
    logger.info('Start consuming queue[%s]', r.service.get_queue_params().name)
    await notification_service.consume(r.callback)


if __name__ == '__main__':

    notification_service = NotificationService()
    register = ConnectionRegister(notification_service)
    application = Application(
        [(r'/ws/(\d+)', WebSocket)], register=register, debug=DEBUG
    )
    application.listen(PORT)
    loop = IOLoop.current()
    loop.add_callback(consuming, register)
    logger.info('Start server on port[%s]', PORT)
    loop.start()
