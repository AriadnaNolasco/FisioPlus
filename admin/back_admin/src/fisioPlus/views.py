from rest_framework import viewsets
from .models import Terapeuta, HorarioDisponible
from .serializers import ( TerapeutaSerializer, HorarioDisponibleSerializer)

#TerapeutaViewSet es el controlador para manejar las operaciones CRUD de Terapeuta
class TerapeutaViewSet(viewsets.ModelViewSet):
    queryset = Terapeuta.objects.all()
    serializer_class = TerapeutaSerializer

#Disponibilidad de horarios para los terapeutas
class HorarioDisponibleViewSet(viewsets.ModelViewSet):
    queryset = HorarioDisponible.objects.all()
    serializer_class = HorarioDisponibleSerializer

    def get_queryset(self):
        terapeuta_username = self.request.query_params.get('terapeuta')
        if terapeuta_username:
            return HorarioDisponible.objects.filter(terapeuta__username=terapeuta_username)
        return HorarioDisponible.objects.all()