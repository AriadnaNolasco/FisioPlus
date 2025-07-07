from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ( TerapeutaViewSet, HorarioDisponibleViewSet, PublicTerapeutaViewSet,
    PublicHorarioDisponibleViewSet,)

router = DefaultRouter()

router.register(r'terapeutas', TerapeutaViewSet)
router.register(r'horarios', HorarioDisponibleViewSet)
router.register(r'public/terapeutas', PublicTerapeutaViewSet, basename='public-terapeuta')
router.register(r'public/horarios', PublicHorarioDisponibleViewSet, basename='public-horarios')


urlpatterns = [
    path('', include(router.urls)),
]
