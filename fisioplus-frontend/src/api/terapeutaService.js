// src/api/terapeutaService.js
import axios from 'axios';

const djangoApi = axios.create({
  baseURL: 'http://localhost:8000/api', // URL de tu backend Django admin
});

// Usamos el token específico del admin (Django)
djangoApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('token_django'); // 👈 Cambio importante
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export const obtenerTerapeutas = async () => {
  const res = await djangoApi.get('/terapeutas/');
  return res.data;
};
