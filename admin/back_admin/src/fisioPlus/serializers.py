from rest_framework import serializers
from .models import Terapeuta, HorarioDisponible
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


class HorarioDisponibleSerializer(serializers.ModelSerializer):
    class Meta:
        model = HorarioDisponible
        fields = '__all__'
        read_only_fields = ['terapeuta'] #Solo el terapeuta logueado puede crear horarios

    def validate(self, data):
        hora_inicio = data.get('hora_inicio')
        hora_fin = data.get('hora_fin')
        dia = data.get('dia_semana')
        terapeuta = self.context['request'].user

        # 1. Validar rango horario
        if hora_inicio >= hora_fin:
            raise serializers.ValidationError("La hora de inicio debe ser menor que la hora de fin.")

        # Verificar traslapes y horarios existentes
        horarios_existentes = HorarioDisponible.objects.filter(
            terapeuta=terapeuta,
            dia_semana=dia
        )

        for horario in horarios_existentes:
            if not (hora_fin <= horario.hora_inicio or hora_inicio >= horario.hora_fin):
                raise serializers.ValidationError("Este horario se traslapa con otro ya registrado.")

        return data

