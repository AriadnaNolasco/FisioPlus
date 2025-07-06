from rest_framework import viewsets
from .models import Terapeuta
from .serializers import ( TerapeutaSerializer, )

class TerapeutaViewSet(viewsets.ModelViewSet):
    queryset = Terapeuta.objects.all()
    serializer_class = TerapeutaSerializer

