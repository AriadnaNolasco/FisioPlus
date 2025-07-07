import axiosDjango from './axiosDjango';

export const obtenerTerapeutas = async () => {
  const res = await axiosDjango.get('/public/terapeutas/');
  return res.data;
};
