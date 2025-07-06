from django.contrib.auth.models import AbstractUser
from django.db import models

class Terapeuta(AbstractUser):
    email = models.EmailField(unique=True)
    especialidad = models.CharField(max_length=100)
    telefono = models.CharField(max_length=20, blank=True)

    REQUIRED_FIELDS = ['email', 'first_name', 'last_name', 'especialidad']

    def __str__(self):
        return self.username