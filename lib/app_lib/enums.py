from enum import IntEnum

__all__ = [
    'NotificationType'
]


class NotificationType(IntEnum):
    CONNECTION = 10
    PING = 20
    TASK_UPDATE = 30
