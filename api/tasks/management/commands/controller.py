from typing import Union, Callable

from django.conf import settings
from django.core.management.base import BaseCommand

from app_lib.services.controller.config import controller_config
from app_lib.log import get_logger
from app_lib.services.main import Service
from app_lib.services.notification_service import NotificationService
from app_lib.connections import SyncConnection
from tasks.handlers import handler


logger = get_logger('tasks.controller')
Request = Union['ControlRequest']


class Command(BaseCommand):
    def handle(self, *args, **options):
        controller = Service(**controller_config)
        notifications = NotificationService()
        connection = SyncConnection(settings.APP_SERVICE_URL)
        controller.setup(connection, create_queue=True)
        notifications.setup(connection, create_queue=True)

        def consume(request: Request, message_ack: Callable):
            handler(request, controller, notifications, message_ack)

        controller.consume(consume)

