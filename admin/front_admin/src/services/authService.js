// src/services/authService.js
import axios from 'axios';
import { API_BASE_URL } from './api';

const API_URL = `${API_BASE_URL}/auth`; // Asegúrate de que este URL sea correcto

export const register = async (data) => {
  return await axios.post(`${API_URL}/users/`, data);
};

export const login = async (data) => {
  return await axios.post(`${API_URL}/jwt/create/`, data);
};

export const getCurrentUser = async (token) => {
  return await axios.get(`${API_URL}/users/me/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
