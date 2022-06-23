from dataclasses import asdict, dataclass
from typing import Union
from app_lib.classes.base import Base
from app_lib.enums import NotificationType


@dataclass
class Notification(Base):
    user_id: int
    payload: Union[str, dict]
    type: NotificationType

    def dict(self):
        return asdict(self)

    @classmethod
    def connection(cls, user_id: int, payload: dict):
        return cls(user_id, payload, NotificationType.CONNECTION)

    @classmethod
    def ping(cls, user_id: int, payload: dict):
        return cls(user_id, payload, NotificationType.PING)
