import pytest
from typing import TYPE_CHECKING, Callable, NoReturn, Tuple, Any

from lib.build.lib.app_lib.messages.message import RenameFileRequest
from tasks.models import File

if TYPE_CHECKING:
    from rest_framework.test import APIClient
    from django.core.files.uploadedfile import SimpleUploadedFile
    from django.contrib.auth.models import User


Service = Tuple[Callable[[Any], NoReturn], Callable[[], dict], Callable[[], dict]]


@pytest.mark.django_db
def test_files_normal_flow(
        client: 'APIClient',
        user: 'User',
        tested_file: 'SimpleUploadedFile'
):
    response = client.post(
        '/api/v1/files/', data={'file': tested_file}, format='multipart'
    )
    assert response.status_code == 201, response.content
    created_data = response.json()

    assert created_data['name'] == tested_file.name

    response = client.get(f'/api/v1/files/{created_data["id"]}/')
    assert response.status_code == 200

    get_data = response.json()
    assert created_data['name'] == get_data['name']


@pytest.mark.django_db
def test_files_service(
        client: 'APIClient',
        file_data: dict,
        service: Service,
        tested_file_split_name: 'Tuple'
):

    file_pk = file_data.get("id")

    response = client.get(f'/api/v1/files/{file_pk}/')

    assert response.status_code == 200

    get_data = response.json()
    _file_name = get_data.get('name')
    _extension = get_data.get('extension')
    _file_instance_pk = get_data.get('id')

    assert file_pk == _file_instance_pk
    assert _file_name == '.'.join(tested_file_split_name)
    assert not _extension

    send, dispatch, dispatch_notifications = service

    send(RenameFileRequest(id=file_pk))
    dispatch()

    file_instance = File.objects.get(pk=file_pk)

    assert file_instance.name == tested_file_split_name[0]
    assert file_instance.extension == tested_file_split_name[1]
