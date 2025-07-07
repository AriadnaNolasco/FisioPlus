import '../assets/styles/Sidebar.css';
import '../assets/styles/dashboard.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Users,
  CheckCircle,
  Calendar,
  BarChart3,
  PieChart,
  AlertTriangle,
  MessageSquare,
  Eye,
  Clock,
  Bell,
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import useAuthStore from '../store/authStore';

export default function Dashboard() {
  const { user, logout } = useAuthStore();
  const [fisioterapeutas, setFisioterapeutas] = useState([]);

  const handleLogout = () => logout();

  const kpiData = [
    { icon: Users, title: "Pacientes Registrados", value: "128", color: "blue" },
    { icon: CheckCircle, title: "Sesiones Completadas", value: "312", color: "green" },
    { icon: Calendar, title: "Reservas de Hoy", value: "12", color: "orange" }
  ];

  const alertas = [
    { type: "warning", message: "2 pacientes sin confirmar", priority: "alta" },
    { type: "info", message: "1 fisioterapeuta en descanso", priority: "media" },
    { type: "warning", message: "3 sesiones sin registrar notas", priority: "alta" }
  ];

  const feedback = [
    { name: "Ana García", message: "Muy buena atención, excelente servicio.", rating: 5 },
    { name: "Luis Martín", message: "Recomiendo al 100%, gran profesionalismo.", rating: 5 },
    { name: "Carmen Ruiz", message: "Instalaciones modernas y trato amable.", rating: 4 }
  ];

  useEffect(() => {
    axios.get('http://localhost:8000/api/terapeutas/')
      .then((response) => {
        const transformed = response.data.map((fisio) => ({
          name: `${fisio.first_name} ${fisio.last_name}`,
          specialty: fisio.especialidad,
          sessions: Math.floor(Math.random() * 30) + 1, // puedes cambiar esto
          status: "Activo"
        }));
        setFisioterapeutas(transformed);
      })
      .catch((error) => {
        console.error('Error al obtener fisioterapeutas:', error);
      });
  }, []);

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="dashboard-content">
        {/* Header */}
        <header className="dashboard-header">
          <div className="header-left">
            <div className="welcome-text">
              <h1>Hola de nuevo, {user?.first_name} {user?.last_name}</h1>
              <p>
                Panel de control -{" "}
                {new Date().toLocaleDateString("es-ES", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
          <div className="header-right">
            <button className="notification-btn">
              <Bell size={20} />
              <span className="notification-badge">3</span>
            </button>
          </div>
        </header>

        {/* KPI Cards */}
        <section className="kpi-section">
          {kpiData.map((kpi, index) => {
            const Icon = kpi.icon;
            return (
              <div key={index} className={`kpi-card ${kpi.color}`}>
                <div className="kpi-icon">
                  <Icon size={28} />
                </div>
                <div className="kpi-content">
                  <h3>{kpi.title}</h3>
                  <p className="kpi-value">{kpi.value}</p>
                </div>
              </div>
            );
          })}
        </section>

        {/* Gráficos */}
        <section className="charts-section">
          <div className="chart-card">
            <div className="chart-header">
              <BarChart3 size={24} className="chart-icon" />
              <h2>Sesiones por Fisioterapeuta</h2>
            </div>
            <div className="chart-placeholder">
              <div className="chart-bars">
                {fisioterapeutas.map((fisio, index) => (
                  <div
                    key={index}
                    className="bar"
                    style={{ height: `${fisio.sessions * 3}%` }}
                  >
                    <span>{fisio.name.split(' ')[0]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="chart-card">
            <div className="chart-header">
              <PieChart size={24} className="chart-icon" />
              <h2>Tipos de Terapia</h2>
            </div>
            <div className="chart-placeholder">
              <div className="donut-chart">
                <div className="donut-center">
                  <span className="donut-total">312</span>
                  <span className="donut-label">Total</span>
                </div>
              </div>
              <div className="donut-legend">
                <div className="legend-item">
                  <div className="legend-color" style={{ backgroundColor: '#3b82f6' }}></div>
                  <span>Masoterapia (45%)</span>
                </div>
                <div className="legend-item">
                  <div className="legend-color" style={{ backgroundColor: '#10b981' }}></div>
                  <span>Ejercicio (35%)</span>
                </div>
                <div className="legend-item">
                  <div className="legend-color" style={{ backgroundColor: '#f59e0b' }}></div>
                  <span>Electroterapia (20%)</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tabla de Fisioterapeutas */}
        <section className="table-section">
          <div className="section-header">
            <h2>Fisioterapeutas Activos</h2>
          </div>
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Especialidad</th>
                  <th>Sesiones</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {fisioterapeutas.map((fisio, index) => (
                  <tr key={index}>
                    <td className="name-cell">
                      <div className="avatar">
                        {fisio.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span>{fisio.name}</span>
                    </td>
                    <td>{fisio.specialty}</td>
                    <td>
                      <span className="sessions-badge">{fisio.sessions}</span>
                    </td>
                    <td>
                      <span className={`status-badge ${fisio.status.toLowerCase()}`}>
                        {fisio.status}
                      </span>
                    </td>
                    <td>
                      <button className="action-btn">
                        <Eye size={16} />
                        Ver
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Aquí continúa tu dashboard-footer con alertas y feedback... */}
        {/* No modificado por brevedad, pero sigue igual */}

     {/* Footer Section */}
        <section className="dashboard-footer">
          <div className="footer-card">
            <div className="card-header">
              <Calendar size={20} />
              <h3>Citas de Hoy</h3>
            </div>
            <div className="appointments">
              <div className="appointment-item">
                <div className="appointment-time">
                  <Clock size={16} />
                  <span>09:00</span>
                </div>
                <div className="appointment-details">
                  <strong>María González</strong>
                  <span>Rehabilitación deportiva</span>
                </div>
              </div>
              <div className="appointment-item">
                <div className="appointment-time">
                  <Clock size={16} />
                  <span>10:30</span>
                </div>
                <div className="appointment-details">
                  <strong>Carlos Mendoza</strong>
                  <span>Masoterapia</span>
                </div>
              </div>
              <div className="appointment-item">
                <div className="appointment-time">
                  <Clock size={16} />
                  <span>14:00</span>
                </div>
                <div className="appointment-details">
                  <strong>Ana Rodríguez</strong>
                  <span>Electroterapia</span>
                </div>
              </div>
            </div>
          </div>

          <div className="footer-card">
            <div className="card-header">
              <AlertTriangle size={20} />
              <h3>Alertas</h3>
            </div>
            <div className="alerts">
              {alertas.map((alert, index) => (
                <div key={index} className={`alert-item ${alert.type}`}>
                  <AlertTriangle size={16} />
                  <span>{alert.message}</span>
                  <span className={`priority ${alert.priority}`}></span>
                </div>
              ))}
            </div>
          </div>

  
        </section>
      </div>
    </div>
  );
}
