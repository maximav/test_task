import logging
import os

__all__ = ['get_logger']


log_level = os.environ.get('APP_LOG_LEVEL', 'INFO').upper()

logging.basicConfig(
    level=getattr(logging, log_level),
    format='%(levelname).1s - %(asctime)s - %(name)s - %(message)s',
)


def get_logger(name):
    logger = logging.getLogger(name)
    return logger
