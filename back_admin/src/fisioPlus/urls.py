from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ( PacienteViewSet, TerapeutaViewSet, CitaViewSet, EjercicioViewSet, TratamientoViewSet )

router = DefaultRouter()
router.register(r'pacientes', PacienteViewSet)
router.register(r'terapeutas', TerapeutaViewSet)
router.register(r'citas', CitaViewSet)
router.register(r'ejercicios', EjercicioViewSet)
router.register(r'tratamientos', TratamientoViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
