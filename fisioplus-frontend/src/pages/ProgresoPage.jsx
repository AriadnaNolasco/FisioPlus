import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';
import axios from '../api/axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../css/ProgresoPage.css';
import 'react-toastify/dist/ReactToastify.css';  // Asegúrate de importar los estilos


import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

const ProgresoPage = () => {
  const { user } = useContext(AuthContext);

  const [estadoFisico, setEstadoFisico] = useState('');
  const [estadoEmocional, setEstadoEmocional] = useState('');
  const [actividadFisica, setActividadFisica] = useState('');
  const [ejercicioCompletado, setEjercicioCompletado] = useState(false);
  const [fechaSeleccionada, setFechaSeleccionada] = useState(new Date());
  const [progresos, setProgresos] = useState([]);
  const [error, setError] = useState('');
  const [mostrarHistorial, setMostrarHistorial] = useState(false); // Estado para mostrar/ocultar historial

  // Fetch progress data
  useEffect(() => {
    if (!user?.id) return;

    axios.get(`/progreso/paciente/${user.id}`)
      .then(res => {
        const sorted = res.data.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
        setProgresos(sorted);
      })
      .catch(err => console.error('Error cargando progresos:', err));
  }, [user]);

  // Calculate the progress based on selected options
  const calcularAvance = (fisico, emocional, actividad) => {
    let base = 100;

    if (fisico === 'Dolor leve') base -= 15;
    if (fisico === 'Dolor moderado') base -= 30;
    if (fisico === 'Dolor fuerte') base -= 50;

    if (emocional === 'Ansioso/a') base -= 20;
    if (emocional === 'Irritado/a') base -= 25;

    if (actividad === 'Sedentario/a') base -= 30;
    if (actividad === 'Activa/o') base -= 10;

    return Math.max(0, Math.min(100, base));
  };

  // Handle form submission
  const handleSubmit = async () => {
    // Obtener la fecha actual
    const today = new Date();
    const todayString = today.toISOString().slice(0, 10); // Formato YYYY-MM-DD
    const selectedDateString = fechaSeleccionada.toISOString().slice(0, 10);

    // Comprobar que la fecha seleccionada no sea futura ni pasada
    if (selectedDateString !== todayString) {
      alert('Solo puedes registrar el progreso para el día de hoy.');
      return;
    }

    if (!estadoFisico || !estadoEmocional || !actividadFisica) {
      alert('Por favor selecciona todas las opciones.');
      return;
    }

    const avanceCalculado = calcularAvance(
      estadoFisico,
      estadoEmocional,
      actividadFisica
    );

    const descripcion = `Estado físico: ${estadoFisico}, Estado emocional: ${estadoEmocional}, Actividad física: ${actividadFisica}`;

    const data = {
      pacienteId: user.id,
      fecha: fechaSeleccionada.toISOString().slice(0, 10),
      descripcion,
      avancePorcentaje: avanceCalculado,
      ejercicioCompletado,
    };

    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post('/progreso', data, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      alert('Progreso registrado con éxito');
      setProgresos(prev => [...prev, response.data]);
      setEstadoFisico('');
      setEstadoEmocional('');
      setActividadFisica('');
      setEjercicioCompletado(false);
      setError('');
    } catch (err) {
      console.error('Error al registrar el progreso:', err.response?.data || err);
      setError(err.response?.data?.message || 'Ocurrió un error al registrar el progreso.');
    }
  };

  // Format date for chart and history
  const formatearFecha = fecha => {
    const d = new Date(fecha);
    return `${d.getDate()}/${d.getMonth() + 1}`;
  };

  // Chart data preparation
  const dataChart = progresos.map(p => ({
    fecha: formatearFecha(p.fecha),
    avance: p.avancePorcentaje,
    isAnomalous: p.avancePorcentaje <= 40,
  }));

  const renderCustomizedLabel = ({ x, y, index }) => {
    if (dataChart[index].isAnomalous) {
      return (
        <text x={x} y={y - 10} className="label-anomalous">
          ANÓMALO
        </text>
      );
    }
    return null;
  };

  return (
    <>
      <Navbar />
      <div className="homepage-container">
        <div className="page-wrapper">
          <main className="progreso-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h2>Mi Progreso</h2>
              <button
                className="submit-progreso"
                onClick={() => setMostrarHistorial(!mostrarHistorial)}
              >
                {mostrarHistorial ? 'Ocultar Historial' : 'Mostrar Historial'}
              </button>
            </div>

            <section className="formulario-progreso">
              <div className="calendar-container">
                <Calendar
                  onChange={setFechaSeleccionada}
                  value={fechaSeleccionada}
                />
              </div>

              <div className="opciones">
                <h4>Estado Físico</h4>
                <select
                  value={estadoFisico}
                  onChange={e => setEstadoFisico(e.target.value)}
                >
                  <option value="">Selecciona un estado</option>
                  <option value="Sin dolor">Sin dolor</option>
                  <option value="Dolor leve">Dolor leve</option>
                  <option value="Dolor moderado">Dolor moderado</option>
                  <option value="Dolor fuerte">Dolor fuerte</option>
                </select>
              </div>

              <div className="opciones">
                <h4>Estado Emocional</h4>
                <select
                  value={estadoEmocional}
                  onChange={e => setEstadoEmocional(e.target.value)}
                >
                  <option value="">Selecciona un estado</option>
                  <option value="Tranquilo/a">Tranquilo/a</option>
                  <option value="Ansioso/a">Ansioso/a</option>
                  <option value="Motivado/a">Motivado/a</option>
                  <option value="Irritado/a">Irritado/a</option>
                </select>
              </div>

              <div className="opciones">
                <h4>Actividad Física</h4>
                <select
                  value={actividadFisica}
                  onChange={e => setActividadFisica(e.target.value)}
                >
                  <option value="">Selecciona una actividad</option>
                  <option value="Sedentario/a">Sedentario/a</option>
                  <option value="Activa/o">Activa/o</option>
                  <option value="Ejercicios completados">Ejercicios completados</option>
                </select>
              </div>

              <div className="opciones">
                <label htmlFor="ejercicioCompletado">
                  Ejercicio completado:
                  <input
                    type="checkbox"
                    id="ejercicioCompletado"
                    checked={ejercicioCompletado}
                    onChange={e => setEjercicioCompletado(e.target.checked)}
                  />
                </label>
              </div>

              <button onClick={handleSubmit} className="submit-progreso">
                Registrar Progreso
              </button>
            </section>

            {mostrarHistorial && (
              <section className="lista-progresos">
                <h3>Historial</h3>
                {progresos.length === 0 ? (
                  <p>No hay progresos registrados.</p>
                ) : (
                  <>
                    {progresos.map(p => (
                      <div key={p.fecha + p.avancePorcentaje} className="progreso-item">
                        <p><strong>{p.fecha}</strong></p>
                        <p>{p.descripcion}</p>
                        <div className="barra-externa">
                          <div
                            className="barra-interna"
                            style={{ width: `${p.avancePorcentaje}%` }}
                          >
                            {p.avancePorcentaje}%
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </section>
            )}

            <div className="grafico-progreso" style={{ marginTop: mostrarHistorial ? '2rem' : 0 }}>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  data={dataChart}
                  margin={{ top: 30, right: 30, left: 20, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="fecha" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="avance"
                    stroke="#00bfa5"
                    strokeWidth={3}
                    dot={{ r: 5 }}
                    label={renderCustomizedLabel}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProgresoPage;
