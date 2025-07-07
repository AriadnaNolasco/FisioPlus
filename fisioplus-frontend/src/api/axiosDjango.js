// src/api/axiosDjango.js
import axios from 'axios';

const axiosDjango = axios.create({
  baseURL: 'http://localhost:8000/api', // ❗️NO INCLUYAS /public aquí
});

export default axiosDjango;
