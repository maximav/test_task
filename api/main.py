import multiprocessing
import os

import gunicorn.app.base
from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'app.settings')
django_app = get_wsgi_application()


def number_of_workers():
    return (multiprocessing.cpu_count() * 2) + 1


# Взято отсюда https://docs.gunicorn.org/en/stable/custom.html
class PythonApplication(gunicorn.app.base.BaseApplication):
    def __init__(self, app, options=None):
        self.options = options or {}
        self.application = app
        super(PythonApplication, self).__init__()

    def load_config(self):
        for key, value in self.options.items():
            self.cfg.set(key.lower(), value)

    def load(self):
        return self.application


if __name__ == '__main__':
    port = int(os.environ.get('APP_API_PORT', '8000'))
    gunicorn_options = {
        'bind': f'0.0.0.0:{port}',
        'workers': number_of_workers(),
        'accesslog': os.environ.get('APP_API_ACCESS_LOG', '-'),
        'errorlog': os.environ.get('APP_API_ERROR_LOG', '-'),
        'timeout': 120,
    }
    application = PythonApplication(django_app, gunicorn_options)
    application.run()
