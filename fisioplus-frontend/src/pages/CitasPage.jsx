import { useEffect, useState, useContext } from 'react';
import axios from '../api/axios';
import { AuthContext } from '../auth/AuthContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../css/CitasPage.css';

const CitasPage = () => {
  const { user } = useContext(AuthContext);
  const [citas, setCitas] = useState([]);
  const [page, setPage] = useState(0);
  const [horariosOcupados, setHorariosOcupados] = useState([]);

  const [nuevaCita, setNuevaCita] = useState({
    motivo: '',
    fecha: '',
    hora: '',
    profesional: ''
  });

  const [error, setError] = useState('');

  const profesionales = [
    'Rafael Ulises Huamanyauri Solis',
    'Roxana Pilar Dávila Nolasco'
  ];

  const motivosFrecuentes = [
    'Dolor lumbar',
    'Lesión de rodilla',
    'Dolor cervical o de cuello',
    'Tendinitis',
    'Dolor de hombro',
    'Recuperación postoperatoria',
    'Evaluación general',
    'Otro'
  ];

  const horariosPorTurno = {
    mañana: ['09:00', '10:00', '11:00', '12:00'],
    tarde: ['13:00', '14:00', '15:00', '16:00', '17:00']
  };

  const fetchCitas = () => {
    if (!user?.id) return;
    axios.get(`/citas/paciente/${user.id}?page=${page}&size=5`)
      .then(res => {
        setCitas(res.data.content);
        const ocupados = res.data.content
          .filter(c => c.estado !== 'CANCELADA')
          .map(c => ({ profesional: c.profesional, fechaHora: c.fechaHora }));
        setHorariosOcupados(ocupados);
      })
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchCitas();
  }, [user, page]);

  const crearCita = (e) => {
    e.preventDefault();
    setError('');

    // Convertir la fecha y hora seleccionadas a un objeto Date
    const [anio, mes, dia] = nuevaCita.fecha.split('-').map(Number);
    const [hora, minuto] = nuevaCita.hora.split(':').map(Number);
    const fechaSeleccionada = new Date(anio, mes - 1, dia, hora, minuto);

    const hoy = new Date();
    if (fechaSeleccionada.toDateString() === hoy.toDateString()) {
      setError('No se puede agendar una cita el mismo día.');
      return;
    }

    const conflicto = horariosOcupados.find(c =>
      c.profesional === nuevaCita.profesional &&
      new Date(c.fechaHora).getTime() === fechaSeleccionada.getTime()
    );

    if (conflicto) {
      setError('El horario seleccionado ya está ocupado para este profesional.');
      return;
    }

    // Convertir la fecha y hora a ISO string para enviar al backend
    const fechaHoraISO = fechaSeleccionada.toISOString().slice(0, 19); // Elimina los segundos y milisegundos

    const payload = {
      pacienteId: user?.id,
      fechaHora: fechaHoraISO, // Enviamos la fecha en formato ISO
      motivo: nuevaCita.motivo,
      profesional: nuevaCita.profesional
    };

    axios.post('/citas', payload)
      .then(() => {
        toast.success('✅ ¡Cita agendada con éxito!');
        setNuevaCita({ motivo: '', fecha: '', hora: '', profesional: '' });
        fetchCitas();
      })
      .catch(err => {
        if (err.response?.data?.message) {
          setError(err.response.data.message);
        } else {
          setError('Error al agendar la cita.');
        }
      });
  };

  const eliminarCita = (id) => {
    axios.delete(`/citas/${id}`)
      .then(() => {
        toast.success('Cita eliminada de forma permanente.');
        fetchCitas();
      })
      .catch(() => toast.error('Error al eliminar la cita.'));
  };

  const formatearFecha = (fecha) =>
    new Date(fecha).toLocaleDateString('es-PE', { year: 'numeric', month: 'long', day: 'numeric' });

  const formatearHora = (fecha) =>
    new Date(fecha).toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' });

  return (
    <>
      <Navbar />
      <ToastContainer />
      <div className="citas-page">
        <div className="formulario-cita">
          <h2>Agenda tu Cita</h2>
          <p>Da el primer paso hacia tu bienestar. Elige un profesional y un horario.</p>

          <form onSubmit={crearCita} className="form-cita">
            <select
              value={nuevaCita.motivo}
              onChange={e => setNuevaCita({ ...nuevaCita, motivo: e.target.value })}
              required
            >
              <option value="">Selecciona el motivo</option>
              {motivosFrecuentes.map(m => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>

            <input
              type="date"
              value={nuevaCita.fecha}
              onChange={e => setNuevaCita({ ...nuevaCita, fecha: e.target.value })}
              required
            />

            <div className="horarios-turnos">
              {Object.entries(horariosPorTurno).map(([turno, horas]) => (
                <div key={turno}>
                  <strong>{`Turno ${turno[0].toUpperCase() + turno.slice(1)}`}</strong>
                  <div className="bloques-horas">
                    {horas.map(h => (
                      <button
                        type="button"
                        key={h}
                        className={`bloque-hora ${nuevaCita.hora === h ? 'seleccionado' : ''}`}
                        onClick={() => setNuevaCita({ ...nuevaCita, hora: h })}
                      >
                        {h}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <select
              value={nuevaCita.profesional}
              onChange={e => setNuevaCita({ ...nuevaCita, profesional: e.target.value })}
              required
            >
              <option value="">Selecciona un profesional</option>
              {profesionales.map(p => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>

            <button type="submit" className="btn-confirmar">Confirmar Cita</button>
            {error && <p className="error">{error}</p>}
          </form>
        </div>

        <div className="mis-citas">
          <h3>Mis Próximas Citas</h3>
          <div className="citas-grid">
            {citas.filter(c => c.estado !== 'CANCELADA').map(cita => (
              <div key={cita.id} className="cita-tarjeta confirmada">
                <div className="cita-header">
                  <strong>Cita Confirmada</strong>
                  <span className="cita-check">✅</span>
                </div>
                <p><strong>Profesional:</strong> {cita.profesional}</p>
                <p><strong>Fecha:</strong> {formatearFecha(cita.fechaHora)}</p>
                <p><strong>Hora:</strong> {formatearHora(cita.fechaHora)}</p>
                <p><strong>Modalidad:</strong> Presencial</p>
              </div>
            ))}
          </div>
        </div>

        {citas.some(c => c.estado === 'CANCELADA') && (
          <div className="mis-citas">
            <h3>Citas Canceladas</h3>
            <div className="citas-grid">
              {citas.filter(c => c.estado === 'CANCELADA').map(cita => (
                <div key={cita.id} className="cita-tarjeta cancelada">
                  <div className="cita-header">
                    <strong>Cita Cancelada</strong>
                    <span className="cita-check">❌</span>
                  </div>
                  <p><strong>Profesional:</strong> {cita.profesional}</p>
                  <p><strong>Fecha:</strong> {formatearFecha(cita.fechaHora)}</p>
                  <p><strong>Hora:</strong> {formatearHora(cita.fechaHora)}</p>
                  <p><strong>Modalidad:</strong> Presencial</p>

                  <button onClick={() => eliminarCita(cita.id)} className="btn-eliminar">
                    Eliminar cita
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="paginacion">
          <button onClick={() => setPage(p => Math.max(0, p - 1))}>Anterior</button>
          <button onClick={() => setPage(p => p + 1)}>Siguiente</button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CitasPage;
