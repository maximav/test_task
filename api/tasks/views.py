from typing import Type
from django.db.models import QuerySet
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.serializers import BaseSerializer
from rest_framework.viewsets import ModelViewSet

from app_lib.messages.message import RenameFileRequest
from tasks.apps import TasksConfig
from tasks.models import File
from tasks.serializers import FileCreateSerializer, FileSerializer
from django.apps import apps

app_config: 'TasksConfig' = apps.get_app_config('tasks')


class FileModelViewSet(ModelViewSet):
    queryset = File.objects.all()
    permission_classes = (IsAuthenticated,)

    def get_queryset(self) -> 'QuerySet':
        return self.queryset.all()

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)

        app_config.service.send_to_controller(RenameFileRequest(id=serializer.instance.pk))

        return Response(
            serializer.data, status=status.HTTP_201_CREATED, headers=headers
        )

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        pk = instance.pk
        self.perform_destroy(instance)
        return Response(data=pk, status=status.HTTP_202_ACCEPTED)

    def get_serializer_class(self) -> Type['BaseSerializer']:
        method = self.request.method
        if method == 'POST':
            return FileCreateSerializer
        else:
            return FileSerializer
