import axios from 'axios';

const axiosDjango = axios.create({
  baseURL: 'http://localhost:8000/api',
});

axiosDjango.interceptors.request.use(config => {
  const token = localStorage.getItem('token_django');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosDjango;
