// src/api/appointmentService.js
import axios from './axiosSpring'; // 👉 Cambiado para usar el backend de Spring Boot

export const getHorariosPorTerapeuta = async (terapeutaId) => {
  const response = await axios.get(`/horarios?terapeutaId=${terapeutaId}`);
  return response.data;
};

export const crearCita = async (citaData) => {
  const response = await axios.post('/citas', citaData);
  return response.data;
};
