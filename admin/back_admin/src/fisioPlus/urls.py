from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ( TerapeutaViewSet, HorarioDisponibleViewSet)

router = DefaultRouter()

router.register(r'terapeutas', TerapeutaViewSet)
router.register(r'horarios', HorarioDisponibleViewSet)


urlpatterns = [
    path('', include(router.urls)),
]
