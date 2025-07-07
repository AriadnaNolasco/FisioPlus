from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from .models import Terapeuta, HorarioDisponible
from .serializers import ( TerapeutaSerializer, HorarioDisponibleSerializer, PublicTerapeutaSerializer, PublicHorarioDisponibleSerializer)

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
    

class PublicTerapeutaViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Terapeuta.objects.all()
    serializer_class = PublicTerapeutaSerializer
    permission_classes = [AllowAny]

class PublicHorarioDisponibleViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = PublicHorarioDisponibleSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        terapeuta_id = self.request.query_params.get('terapeuta')
        if terapeuta_id:
            try:
                terapeuta_id = int(terapeuta_id)
            except ValueError:
                return HorarioDisponible.objects.none()
            return HorarioDisponible.objects.filter(terapeuta_id=terapeuta_id)
        return HorarioDisponible.objects.none()