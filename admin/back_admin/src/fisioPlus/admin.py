from django.contrib import admin

from .models import Paciente, Terapeuta, Cita, Ejercicio, Tratamiento

admin.site.register(Paciente)
admin.site.register(Terapeuta)
admin.site.register(Cita)
admin.site.register(Ejercicio)
admin.site.register(Tratamiento)
