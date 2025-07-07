// src/pages/RegisterPage.jsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../services/authService';
import '../assets/styles/LogReg.css';

export default function RegisterPage() {
  const [form, setForm] = useState({
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    especialidad: '',
    password: '',
    password2: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.password2) {
      alert('Las contraseñas no coinciden');
      return;
    }

    try {
      await register(form);
      alert('Registro exitoso');
      navigate('/login'); // Redirige al login
    } catch (err) {
      console.error(err);
      alert('Error al registrar. Verifica los datos.');
    }
  };

  return (
    <div className="login-page">
      <div className="auth-container">
        <div className="auth-card">
          <h2>Registro de Terapeuta</h2>
          <form onSubmit={handleSubmit}>
            <input name="username" onChange={handleChange} placeholder="Usuario" required />
            <input name="first_name" onChange={handleChange} placeholder="Nombre" required />
            <input name="last_name" onChange={handleChange} placeholder="Apellido" required />
            <input name="email" type="email" onChange={handleChange} placeholder="Correo" required />
            <input name="especialidad" onChange={handleChange} placeholder="Especialidad" required />
            <input name="password" type="password" onChange={handleChange} placeholder="Contraseña" required />
            <input name="password2" type="password" onChange={handleChange} placeholder="Confirmar contraseña" required />
            <button type="submit">Registrarse</button>
          </form>
          <div className="link">
            <span>¿Ya tienes cuenta? </span>
            <Link to="/login">Inicia sesión</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
