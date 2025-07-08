import React, { useEffect, useState, useContext } from 'react';
import api from '../services/api';
import '../css/HorarioPage.css';
import { AuthContext } from '../auth/AuthContext';
import Sidebar from '../components/Sidebar';

const MiHorarioPage = () => {
  const { user } = useContext(AuthContext);
  const [horarios, setHorarios] = useState([]);
  const [showCrear, setShowCrear] = useState(false);

  useEffect(() => {
    if (!user) return;

    api.get(`/horarios/?terapeuta=${user.id}`)
      .then(res => setHorarios(res.data))
      .catch(err => console.error('Error al cargar horarios:', err));
  }, [user]);

  const handleNuevaRegla = (reglaNueva) => {
    setHorarios(prev => [...prev, reglaNueva]);
  };

  // resto del código...

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="mi-horario-container">
        <h2>Mi Horario</h2>
        <p>Gestiona tus reglas de disponibilidad y revisa tus citas programadas.</p>

        <div className="seccion-encabezado">
          <h3>👨‍⚕️ Dr(a). {user?.first_name} {user?.last_name}</h3>
          <button className="btn-crear" onClick={() => setShowCrear(true)}>➕ Crear Regla</button>
        </div>

        {showCrear && (
          <CrearReglaForm
            onClose={() => setShowCrear(false)}
            onReglaCreada={handleNuevaRegla}
          />
        )}

        {/* Tabla horarios y demás */}
      </div>
    </div>
  );
};

export default MiHorarioPage;
