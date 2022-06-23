__all__ = ['controller_config']

from app_lib.amqp_routes import CONTROLLER, CONTROLLER_EXCHANGE


controller_messages = [
]

controller_config = {
    "name": CONTROLLER,
    "types": controller_messages,
    "exchange_name": CONTROLLER_EXCHANGE,
    "queue_name": CONTROLLER,
    "routing_name": CONTROLLER
}
