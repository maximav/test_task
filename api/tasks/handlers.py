from functools import singledispatch
from typing import Callable

from app_lib.log import get_logger
from app_lib.services.main import Service
from app_lib.services.notification_service import NotificationService

logger = get_logger('tasks.handlers')


@singledispatch
def handler(
        request,
        service: Service,
        notifications: 'NotificationService',
        message_ack: Callable
):
    logger.warning('Unregister type[%s]', type(request))
    message_ack()

