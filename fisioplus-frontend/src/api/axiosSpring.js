import axios from 'axios';

const axiosSpring = axios.create({
  baseURL: 'http://localhost:8085/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosSpring.interceptors.request.use(config => {
  const token = localStorage.getItem('token_spring');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosSpring;
