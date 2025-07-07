import axios from 'axios';

export const API_BASE_URL = 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL + '/api', // si tus endpoints están bajo /api/
  headers: {
    'Content-Type': 'application/json',
  },
});

// Puedes agregar interceptores para auth si quieres, luego

export default api;
