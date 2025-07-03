import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';
import axios from '../api/axios';
import Navbar from '../components/Navbar';
import '../css/ProgresoPage.css';
import Footer from '../components/Footer';

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
  const [progresos, setProgresos] = useState([]);

  useEffect(() => {
    if (!user?.id) return;

    axios.get(`/progreso/paciente/${user.id}`)
      .then(res => {
        const sorted = res.data.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
        setProgresos(sorted);
      })
      .catch(err => console.error('Error cargando progresos:', err));
  }, [user]);

  const calcularAvance = (fisico, emocional, actividad) => {
    let base = 100;

    if (fisico.includes('dolor leve')) base -= 15;
    if (fisico.includes('dolor moderado')) base -= 30;
    if (fisico.includes('dolor fuerte')) base -= 50;

    if (emocional.includes('ansioso')) base -= 15;
    if (emocional.includes('irritado')) base -= 25;

    if (actividad.includes('sedentario')) base -= 40;
    if (actividad.includes('activa')) base -= 10;

    return Math.max(0, Math.min(100, base));
  };

  const handleSubmit = async () => {
    if (!estadoFisico || !estadoEmocional || !actividadFisica) {
      alert('Por favor selecciona todas las opciones.');
      return;
    }

    const avanceCalculado = calcularAvance(
      estadoFisico.toLowerCase(),
      estadoEmocional.toLowerCase(),
      actividadFisica.toLowerCase()
    );

    const descripcion = `Estado físico: ${estadoFisico}, Estado emocional: ${estadoEmocional}, Actividad física: ${actividadFisica}`;

    const data = {
      pacienteId: user.id,
      fecha: new Date().toISOString().slice(0, 10),
      descripcion,
      avancePorcentaje: avanceCalculado,
    };

    try {
      await axios.post('/progreso', data);
      alert('Progreso registrado con éxito');
      setEstadoFisico('');
      setEstadoEmocional('');
      setActividadFisica('');
      setProgresos(prev => [...prev, data]);
    } catch (error) {
      console.error('Error al registrar el progreso:', error);
      alert('Ocurrió un error al registrar el progreso.');
    }
  };

  const formatearFecha = fecha => {
    const d = new Date(fecha);
    return `${d.getDate()}/${d.getMonth() + 1}`;
  };

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

      <div className="homepage1-background">
        <div className="homepage-container">
          <div className="page-wrapper">

            <main className="progreso-container">
              <h2>Mi Progreso</h2>

              <section className="formulario-progreso">
                <div className="opciones">
                  <h4>Estado Físico</h4>
                  {['😌 Sin dolor', '🙂 Dolor leve', '😣 Dolor moderado', '😖 Dolor fuerte'].map(op => (
                    <button
                      key={op}
                      className={estadoFisico === op ? 'opcion activa' : 'opcion'}
                      onClick={() => setEstadoFisico(op)}
                    >
                      {op}
                    </button>
                  ))}
                </div>

                <div className="opciones">
                  <h4>Estado Emocional</h4>
                  {['😎 Tranquilo/a', '😰 Ansioso/a', '💪 Motivado/a', '😡 Irritado/a'].map(op => (
                    <button
                      key={op}
                      className={estadoEmocional === op ? 'opcion activa' : 'opcion'}
                      onClick={() => setEstadoEmocional(op)}
                    >
                      {op}
                    </button>
                  ))}
                </div>

                <div className="opciones">
                  <h4>Actividad Física</h4>
                  {['🛋️ Sedentario/a', '🏃 Activa/o', '✅ Ejercicios completados'].map(op => (
                    <button
                      key={op}
                      className={actividadFisica === op ? 'opcion activa' : 'opcion'}
                      onClick={() => setActividadFisica(op)}
                    >
                      {op}
                    </button>
                  ))}
                </div>

                <button onClick={handleSubmit} className="submit-progreso">
                  Registrar Progreso
                </button>
              </section>

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

                    <div className="grafico-progreso">
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
                  </>
                )}
              </section>
            </main>

          </div>
        </div>
          <Footer />

      </div>
    </>
  );
};

export default ProgresoPage;
