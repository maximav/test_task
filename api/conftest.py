from typing import TYPE_CHECKING
from django.apps import apps
import pytest
from django.core.files.uploadedfile import SimpleUploadedFile
from queue import Empty
from rest_framework.test import APIClient
from tasks.handlers import handler
from django.contrib.auth.models import User

from lib.build.lib.app_lib.services.notification_service import NotificationService
from tasks.models import File

if TYPE_CHECKING:
    from tasks.apps import TasksConfig


TEST_USER = 'test_user'


@pytest.fixture
def anon_client():
    return APIClient()


@pytest.fixture
def user():
    user = User.objects.create_user(username=TEST_USER, is_superuser=True)
    return user


@pytest.fixture
def client(anon_client, user):
    anon_client.force_authenticate(user)
    return anon_client


ADMIN_NAME = 'admin'


@pytest.fixture
def admin():
    # TODO нужно дополнить фикстуру что бы она возвращала вновь созданного пользователя в статусе admin
    ...


@pytest.fixture
def admin_client(admin, anon_client):
    anon_client.force_authenticate(admin)
    return anon_client


@pytest.fixture
def file_content():
    return b"""
Barcode;PN;IPN;Quantity;Address;ID_ERP;Type;Level;Spec
"""


@pytest.fixture
def tested_file(file_content):
    filename = "test.csv"
    return SimpleUploadedFile(filename, file_content, content_type='text/csv')


@pytest.fixture
def tested_file_split_name(tested_file):
    values = tested_file.name.split('.')
    _name = values[0]
    _extension = values[1]
    return _name, _extension


@pytest.fixture
def file_instance(tested_file, user):
    return File.objects.create(file=tested_file, name=tested_file.name)


@pytest.fixture
def connection():
    app_config: 'TasksConfig' = apps.get_app_config('tasks')
    return app_config.service.conn


@pytest.fixture
def service(connection):
    app_config: 'TasksConfig' = apps.get_app_config('tasks')
    notification_service = NotificationService()
    notification_service.setup(app_config.service.conn)
    empty_dispatch = connection.consuming(
        app_config.service.get_queue_params(), lambda x, y: None
    )

    empty = False
    # We need clean queue before using
    while not empty:
        try:
            empty_dispatch()
        except Empty:
            empty = True

    def consumer_tasks(request, message_ack):
        handler(request, app_config.service, notification_service, message_ack)

    def consumer_notifications(request):
        pass

    return (
        app_config.service.send_to_controller,
        app_config.service.consume(consumer_tasks),
        notification_service.consume(consumer_notifications),
    )


@pytest.fixture
def file_data(file_instance):
    return {'id': file_instance.pk}
