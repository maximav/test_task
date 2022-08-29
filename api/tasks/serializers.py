from typing import Any

from rest_framework.fields import CharField
from rest_framework.serializers import ModelSerializer

from tasks.models import File


class FileCreateSerializer(ModelSerializer):
    name = CharField(max_length=2048, required=False)

    class Meta:
        model = File
        fields = ('id', 'file', 'name')
        read_only_fields = ('id',)

    def create(self, validated_data: Any) -> 'File':
        name = validated_data.get('name')
        validated_data['name'] = name or validated_data['file'].name
        instance = super().create(validated_data)
        return instance


class FileSerializer(ModelSerializer):

    class Meta:
        model = File
        fields = '__all__'
