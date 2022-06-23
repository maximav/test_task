from dataclasses import asdict, dataclass, field
from uuid import uuid4

from aio_pika import ExchangeType

__all__ = [
    'Base',
    'QueueParams',
    'ExchangeParams'
]


@dataclass
class Base:
    def dict(self):
        return asdict(self)


@dataclass
class QueueParams(Base):
    name: str = field(default_factory=lambda: str(uuid4()))
    durable: bool = field(default=True)
    auto_delete: bool = field(default=False)
    exclusive: bool = field(default=False)


@dataclass
class ExchangeParams(Base):
    name: str
    durable: bool = field(default=True)
    auto_delete: bool = field(default=False)
    type: ExchangeType = field(default=ExchangeType.DIRECT)