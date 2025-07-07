import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';
import Navbar from '../components/Navbar';
import '../css/HomePage.css';
import Footer from '../components/Footer';
import Chatbot from '../components/Chatbot'; // Importar el componente Chatbot
import Slider from "react-slick"; // Importar Slider para el carrusel

const HomePage = () => {
  const { auth } = useContext(AuthContext);
  const userName = auth?.user?.username || 'Usuario';

  // Configuración de los settings del carrusel
  const settings = {
    dots: true, // Para mostrar los puntos de navegación
    infinite: true, // Carrusel infinito
    speed: 500, // Velocidad del carrusel
    slidesToShow: 1, // Cuántas imágenes mostrar a la vez
    slidesToScroll: 1, // Número de imágenes que se desplazan al hacer scroll
    autoplay: true, // Para hacer que el carrusel avance automáticamente
    autoplaySpeed: 3000, // Tiempo en milisegundos entre cada imagen
  };

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
                  <Slider {...settings}>
                    {/* Carrusel de 4 imágenes */}
                    <div>
                      <img
                        className="hero-image"
                        src="/images/hero-health1.png"
                        alt="Salud y bienestar"
                      />
                    </div>
                    <div>
                      <img
                        className="hero-image"
                        src="/images/hero-health2.png"
                        alt="Salud y bienestar"
                      />
                    </div>
                    <div>
                      <img
                        className="hero-image"
                        src="/images/hero-health3.png"
                        alt="Salud y bienestar"
                      />
                    </div>
                    <div>
                      <img
                        className="hero-image"
                        src="/images/hero-health4.png"
                        alt="Salud y bienestar"
                      />
                    </div>
                  </Slider>
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
            </main>

            {/* Componente Chatbot */}
            <Chatbot />  {/* Asegúrate de agregar este componente aquí si quieres mostrarlo */}

          </div>
          {/* Pie de página */}
          <Footer />
        </div>
      </div>
    </>
  );
};

export default HomePage;
