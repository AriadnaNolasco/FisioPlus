import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';
import Navbar from '../components/Navbar';
import '../css/HomePage.css';
import Footer from '../components/Footer';
import Chatbot from '../components/Chatbot'; // Importar el componente Chatbot

const HomePage = () => {
  const { auth } = useContext(AuthContext);
  const userName = auth?.user?.firstName || 'Usuario';

  return (
    <>
      {/* ✅ Navbar reutilizable */}
      <Navbar />

      {/* Fondo y contenido principal */}
      <div className="homepage-background">
        <div className="homepage-container">
          <div className="page-wrapper">
            {/* Contenido principal */}
            <main className="homepage-main">
              {/* Sección de bienvenida */}
              <section className="welcome-section">
                <div className="welcome-image">
                  <img
                    className="hero-image"
                    src="/images/hero-health.png"
                    alt="Salud y bienestar"
                  />
                </div>
                <div className="welcome-text">
                  <h2>
                    Bienvenido, <span>{userName}</span>
                  </h2>
                  <p>Tu portal de salud y bienestar personalizado</p>
                </div>
              </section>

              {/* Accesos rápidos */}
              <section className="quick-access">
                <div className="access-card">
                  <img src="/images/perfil-icon.png" alt="Perfil" />
                  <Link to="/perfil">Ver Perfil</Link>
                </div>
                <div className="access-card">
                  <img src="/images/cita-icon.png" alt="Citas" />
                  <Link to="/citas">Gestionar Citas</Link>
                </div>
                <div className="access-card">
                  <img src="/images/ejercicio-icon.png" alt="Ejercicios" />
                  <Link to="/ejercicios">Mis Ejercicios</Link>
                </div>
                <div className="access-card">
                  <img src="/images/progreso-icon.png" alt="Progreso" />
                  <Link to="/progreso">Progreso</Link>
                </div>
              </section>

              {/* Aquí agregamos el Chatbot */}
              <section className="chatbot-section">
                <h3>¡Habla con nuestro Asistente Virtual!</h3>
                <Chatbot /> {/* Componente del Chatbot */}
              </section>
            </main>

            {/* Pie de página */}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default HomePage;
