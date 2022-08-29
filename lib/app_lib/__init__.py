from os import environ

from app_lib.classes.base import *  # NOQA
from app_lib.classes.notification import *  # NOQA
from app_lib.messages.message import *  # NOQA
from app_lib.services.main import *  # NOQA
from app_lib.services.notification_service import *  # NOQA
from app_lib.connections import *  # NOQA
from app_lib.enums import *  # NOQA
from app_lib.log import *  # NOQA

DEBUG = environ.get('APP_ENV', '').lower() == 'test'
