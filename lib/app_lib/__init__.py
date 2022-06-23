from os import environ

DEBUG = environ.get('APP_ENV', '').lower() == 'test'
