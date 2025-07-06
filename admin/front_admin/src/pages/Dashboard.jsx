// src/pages/Dashboard.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/dashboard.css';
import useAuthStore from '../store/authStore';

export default function Dashboard() {
  const { user, logout, accessToken } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  useEffect(() => {
    if (!accessToken || !user) {
      // Si no hay token o usuario cargado, redirige al login
      navigate('/login');
    }
  }, [accessToken, user, navigate]);

  return (
    <div className="dashboard-container">
      <header>
        <h1>Bienvenido, {user?.first_name} {user?.last_name}</h1>
        <button onClick={handleLogout}>Cerrar sesión</button>
      </header>

      <section className="cards">
        <div className="card">📅 Gestionar Horarios</div>
        <div className="card">👥 Ver Pacientes</div>
        <div className="card">📈 Progreso Terapéutico</div>
        <div className="card">💪 Ver Ejercicios</div>
      </section>
    </div>
  );
}
