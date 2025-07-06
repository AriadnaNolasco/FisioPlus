from django.contrib.auth.models import AbstractUser
from django.db import models
from django.conf import settings

class Terapeuta(AbstractUser):
    email = models.EmailField(unique=True)
    especialidad = models.CharField(max_length=100)


    REQUIRED_FIELDS = ['email', 'first_name', 'last_name', 'especialidad']

    def __str__(self):
        return self.username
    

class HorarioDisponible(models.Model):
    DIAS_SEMANA = [
        ('LUNES', 'Lunes'),
        ('MARTES', 'Martes'),
        ('MIERCOLES', 'Miércoles'),
        ('JUEVES', 'Jueves'),
        ('VIERNES', 'Viernes'),
    ]

    terapeuta = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='horarios')
    dia_semana = models.CharField(max_length=10, choices=DIAS_SEMANA)
    hora_inicio = models.TimeField()
    hora_fin = models.TimeField()

    class Meta:
        unique_together = ('terapeuta', 'dia_semana', 'hora_inicio')

    def __str__(self):
        return f"{self.terapeuta.username} - {self.dia_semana} {self.hora_inicio} - {self.hora_fin}"