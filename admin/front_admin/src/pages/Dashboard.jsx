// src/pages/Dashboard.jsx
import { useNavigate } from 'react-router-dom';
import '../assets/styles/dashboard.css'; // Lo crearemos
import useAuthStore from '../store/authStore';

export default function Dashboard() {
  const { user, logout} = useAuthStore(); // Asegúrate de importar useAuthStore desde tu store
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

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
