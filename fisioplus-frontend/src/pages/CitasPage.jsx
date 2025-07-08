import { useEffect, useState, useContext } from 'react';
import axiosSpring from '../api/axiosSpring'; // 👉 para backend Spring
import { obtenerTerapeutas } from '../api/terapeutaService'; // 👉 para backend Django
import axiosDjango from '../api/axiosDjango';
import { AuthContext } from '../auth/AuthContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../css/CitasPage.css';

const CitasPage = () => {
  const { user } = useContext(AuthContext);

  const [terapeutas, setTerapeutas] = useState([]);
  const [horarios, setHorarios] = useState([]);
  const [citas, setCitas] = useState([]);

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

  // Obtener terapeutas
  useEffect(() => {
    obtenerTerapeutas()
      .then(res => {
        console.log('✅ Terapeutas recibidos:', res);
        setTerapeutas(res);
      })
      .catch(err => console.error('❌ Error al obtener terapeutas', err));
  }, []);

  // Obtener horarios por terapeuta y fecha
  useEffect(() => {
    if (nuevaCita.terapeutaId && nuevaCita.fecha) {
      console.log("Buscando horarios para terapeuta ID:", nuevaCita.terapeutaId);

      const diasSemana = ['DOMINGO', 'LUNES', 'MARTES', 'MIERCOLES', 'JUEVES', 'VIERNES', 'SABADO'];
      const dia = new Date(nuevaCita.fecha).getDay(); // 0 = domingo, 1 = lunes, ...
      const diaSemana = diasSemana[dia];
      console.log("Día de la semana detectado:", diaSemana);

      // 👇 Aquí va la simulación
      const horariosMock = [
        {
          dia_semana: diaSemana,
          hora_inicio: '08:00',
          hora_fin: '12:00'
        },
        {
          dia_semana: diaSemana,
          hora_inicio: '14:00',
          hora_fin: '17:00'
        }
      ];

      console.log("✅ Simulando horarios para el día:", diaSemana);
      setHorarios(horariosMock);

      // ❌ Comentamos temporalmente la petición real
      /*
      axiosDjango
        .get(`/horarios/?terapeuta=${nuevaCita.terapeutaId}`)
        .then(res => {
          console.log("Horarios recibidos:", res.data);
          const horariosDelDia = res.data.filter(h => h.dia_semana === diaSemana);
          setHorarios(horariosDelDia);
        })
        .catch(err => console.error('❌ Error al obtener horarios', err));
      */
    } else {
      setHorarios([]);
    }
  }, [nuevaCita.terapeutaId, nuevaCita.fecha]);




  const agruparHorarios = () => {
    const grupos = { mañana: [], tarde: [] };
    horarios.forEach(horario => {
      const inicio = horario.hora_inicio.slice(0, 5);
      const fin = horario.hora_fin.slice(0, 5);
      let [h, m] = inicio.split(':').map(Number);
      const [hFin, mFin] = fin.split(':').map(Number);

      while (h < hFin || (h === hFin && m < mFin)) {
        const hora = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
        const turno = h < 13 ? 'mañana' : 'tarde';
        grupos[turno].push(hora);
        m += 60;
        if (m >= 60) {
          h += 1;
          m = 0;
        }
      }
    });
    return grupos;
  };

  const fetchCitas = () => {
    if (!user?.id) return;
    axiosSpring.get(`/citas/paciente/${user.id}?page=${page}&size=5`)
      .then(res => {
        setCitas(res.data.content);
        const ocupados = res.data.content
          .filter(c => c.estado !== 'CANCELADA')
          .map(c => ({ terapeutaId: c.terapeutaId, fechaHora: c.fechaHora }));
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

    const [anio, mes, dia] = nuevaCita.fecha.split('-').map(Number);
    const [hora, minuto] = nuevaCita.hora.split(':').map(Number);
    const fechaSeleccionada = new Date(anio, mes - 1, dia, hora, minuto);

    const hoy = new Date();
    if (fechaSeleccionada.toDateString() === hoy.toDateString()) {
      setError('No se puede agendar una cita el mismo día.');
      return;
    }

    const conflicto = horariosOcupados.find(c =>
      c.terapeutaId === nuevaCita.terapeutaId &&
      new Date(c.fechaHora).getTime() === fechaSeleccionada.getTime()
    );

    if (conflicto) {
      setError('El horario seleccionado ya está ocupado para este profesional.');
      return;
    }

    const payload = {
      pacienteId: user?.id,
      terapeutaId: nuevaCita.terapeutaId,
      motivo: nuevaCita.motivo,
      fechaHora: fechaSeleccionada.toISOString().slice(0, 19)
    };

    console.log("➡️ Simulando creación de cita con payload:", payload);

    // Simula un retraso de 1 segundo como si esperara la respuesta del backend
    setTimeout(() => {
      toast.success('✅ ¡Cita agendada con éxito (simulada)!');
      setNuevaCita({ motivo: '', fecha: '', hora: '', terapeutaId: '' });

      // Simula una cita agregada a la lista (solo si quieres mostrarla sin fetch real)
      const citaFalsa = {
        id: Date.now(), // ID falso único
        profesional: terapeutas.find(t => t.id == payload.terapeutaId)?.first_name + ' ' +
          terapeutas.find(t => t.id == payload.terapeutaId)?.last_name,
        fechaHora: payload.fechaHora,
        estado: 'CONFIRMADA'
      };

      setCitas(prev => [...prev, citaFalsa]);
    }, 1000);

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

  const horariosAgrupados = agruparHorarios();

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
                <option key={t.id} value={t.id}>{t.first_name} {t.last_name}</option>
              ))}
            </select>

            {/* Fecha */}
            <input
              type="date"
              value={nuevaCita.fecha}
              onChange={e => setNuevaCita({ ...nuevaCita, fecha: e.target.value })}
              required
              disabled={!nuevaCita.terapeutaId}
            />

            {/* Horarios */}
            <div className="horarios-turnos">
              {Object.entries(horariosAgrupados).map(([turno, horas]) => (
                <div key={turno}>
                  <strong>Turno {turno[0].toUpperCase() + turno.slice(1)}</strong>
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
