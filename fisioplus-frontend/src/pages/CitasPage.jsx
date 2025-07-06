import { useEffect, useState, useContext } from 'react';
import axiosSpring from '../api/axios';
import { obtenerTerapeutas } from '../api/terapeutaService';
import { AuthContext } from '../auth/AuthContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../css/CitasPage.css';

const CitasPage = () => {
  const { user } = useContext(AuthContext);
  const [citas, setCitas] = useState([]);
  const [terapeutas, setTerapeutas] = useState([]);
  const [horarios, setHorarios] = useState([]);
  const [horariosOcupados, setHorariosOcupados] = useState([]);
  const [page, setPage] = useState(0);

  const [nuevaCita, setNuevaCita] = useState({
    motivo: '',
    fecha: '',
    hora: '',
    terapeutaId: ''
  });

  const [error, setError] = useState('');

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

  // 🔹 1. Obtener lista de terapeutas desde Django
  useEffect(() => {
    obtenerTerapeutas()
      .then(res => {
        console.log('✅ Terapeutas recibidos:', res); // 👈 Agrega este log
        setTerapeutas(res);
      })
      .catch(err => console.error('Error al obtener terapeutas', err));
  }, []);

  // 🔹 2. Cuando se seleccione terapeuta y fecha, obtener horarios desde Django
  useEffect(() => {
    if (nuevaCita.terapeutaId && nuevaCita.fecha) {
      const diaSemana = new Date(nuevaCita.fecha)
        .toLocaleDateString('en-US', { weekday: 'long' })
        .toUpperCase();

      fetch(`http://localhost:8000/api/horarios/?terapeuta=${nuevaCita.terapeutaId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token_django')}`
        }
      })
        .then(res => res.json())
        .then(data => {
          const horariosDelDia = data.filter(h => h.dia_semana === diaSemana);
          setHorarios(horariosDelDia);
        })
        .catch(err => console.error('Error al obtener horarios', err));
    } else {
      setHorarios([]);
    }
  }, [nuevaCita.terapeutaId, nuevaCita.fecha]);

  // 🔹 3. Obtener citas actuales del usuario desde Spring
  const fetchCitas = () => {
    if (!user?.id) return;
    axiosSpring.get(`/citas/paciente/${user.id}?page=${page}&size=5`)
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

  // 🔹 Crear cita en Spring
  const crearCita = (e) => {
    e.preventDefault();
    setError('');

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

    const fechaHoraISO = fechaSeleccionada.toISOString().slice(0, 19);

    const payload = {
      pacienteId: user?.id,
      terapeutaId: nuevaCita.terapeutaId,
      motivo: nuevaCita.motivo,
      fechaHora: fechaHoraISO
    };

    axiosSpring.post('/citas', payload)
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
    axiosSpring.delete(`/citas/${id}`)
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
            {/* Motivo */}
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

            {/* Terapeuta */}
            <select
              value={nuevaCita.terapeutaId}
              onChange={e => setNuevaCita({ ...nuevaCita, terapeutaId: e.target.value })}
              required
            >
              <option value="">Selecciona un profesional</option>
              {terapeutas.map(t => (
                <option key={t.id} value={t.id}>{t.nombre}</option>
              ))}
            </select>

            {/* Fecha */}
            <input
              type="date"
              value={nuevaCita.fecha}
              onChange={e => setNuevaCita({ ...nuevaCita, fecha: e.target.value })}
              required
              disabled={!nuevaCita.terapeutaId} // 🔒 Desactivar fecha si no hay terapeuta
            />

            {/* Horarios */}
            <div className="horarios-turnos">
              {horarios.length === 0 ? (
                <p style={{ marginTop: '1rem' }}>Selecciona un profesional y fecha para ver los horarios disponibles.</p>
              ) : (
                horarios.map(horario => {
                  const horaInicio = horario.hora_inicio.slice(0, 5);
                  const horaFin = horario.hora_fin.slice(0, 5);

                  const opciones = [];
                  let [h, m] = horaInicio.split(':').map(Number);
                  const [endH, endM] = horaFin.split(':').map(Number);

                  while (h < endH || (h === endH && m < endM)) {
                    const hora = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
                    opciones.push(hora);
                    m += 60;
                    if (m >= 60) {
                      h += 1;
                      m = 0;
                    }
                  }

                  return (
                    <div key={horario.id}>
                      <strong>Turno: {horario.turno}</strong>
                      <div className="bloques-horas">
                        {opciones.map(hora => (
                          <button
                            type="button"
                            key={hora}
                            className={`bloque-hora ${nuevaCita.hora === hora ? 'seleccionado' : ''}`}
                            onClick={() => setNuevaCita({ ...nuevaCita, hora })}
                          >
                            {hora}
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

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
