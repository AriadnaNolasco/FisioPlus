from rest_framework import serializers
from .models import Terapeuta
from djoser.serializers import UserCreateSerializer as BaseUserCreateSerializer, UserSerializer as BaseUserSerializer

class TerapeutaRegisterSerializer(BaseUserCreateSerializer):
    password2 = serializers.CharField(write_only=True)

    class Meta(BaseUserCreateSerializer.Meta):
        model = Terapeuta
        fields = (
            'id',
            'username',
            'first_name',
            'last_name',
            'email',
            'especialidad',
            'password',
            'password2',
        )

    def validate(self, data):
        if data['password'] != data['password2']:
            raise serializers.ValidationError("Las contraseñas no coinciden.")
        return data

    def create(self, validated_data):
        validated_data.pop('password2')
        return super().create(validated_data)

# Este es para obtener los datos del terapeuta logueado
class TerapeutaSerializer(BaseUserSerializer):
    class Meta(BaseUserSerializer.Meta):
        model = Terapeuta
        fields = (
            'id',
            'username',
            'first_name',
            'last_name',
            'email',
            'especialidad',
        )

