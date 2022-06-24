from collections import namedtuple
from dataclasses import asdict, is_dataclass, dataclass
from json import dumps
from typing import TYPE_CHECKING, Optional

from app_lib.classes.base import Base

if TYPE_CHECKING:
    from dataclasses import dataclass  # NOQA


TYPE_FIELD = 't'
META_FIELD = '_meta'


MetaMessage = namedtuple('MetaMessage', [TYPE_FIELD], defaults=[None])

__all__ = [
    'Message',
    'RenameFileRequest'
]


class Message:
    exchange: str
    routing_key: str
    meta: MetaMessage

    def __init__(self, data: dict, meta: Optional[MetaMessage] = None):
        self.d = data
        self.meta = meta or MetaMessage()

    def string(self) -> str:
        return dumps(self.dict(), indent=4, sort_keys=True, default=str)

    def bytes(self) -> bytes:
        return dumps(self.dict(), indent=4, sort_keys=True, default=str).encode()

    def dict(self) -> dict:
        return {META_FIELD: self.meta._asdict(), **self.d}

    @classmethod
    def from_dataclass(cls, instance: 'dataclass'):
        assert is_dataclass(instance), f'instance must be dataclass {type(instance)}'
        return cls(asdict(instance), MetaMessage(instance.__class__.__name__))

    @staticmethod
    def pop_meta(data: dict) -> MetaMessage:
        meta = data.pop(META_FIELD)
        return MetaMessage(**meta)


@dataclass
class RenameFileRequest(Base):
    id: int
