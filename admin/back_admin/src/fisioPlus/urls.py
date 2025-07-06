from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ( TerapeutaViewSet)

router = DefaultRouter()

router.register(r'terapeutas', TerapeutaViewSet)


urlpatterns = [
    path('', include(router.urls)),
]
