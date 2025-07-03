// src/pages/ClinicaPublic.jsx

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import bannerbg from '../assets/img/banner-bg.png';

const ClinicaPublic = () => {
  return (
    <div
      className="background-wrapper"
      style={{
        backgroundImage: `url(${bannerbg})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        padding: '100px 1.5rem 0 1.5rem',
        backgroundAttachment: 'fixed',
        minHeight: '100vh',
      }}
    >
      <style>{`
        .public-page-container {
          max-width: 1000px;
          margin: 4rem auto;
          padding: 0rem 1.5rem;
          font-family: 'Segoe UI', sans-serif;
          border-radius: 16px;
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.05);
        }

        .hero-section {
          text-align: center;
          padding: 4rem 0;
          margin: 2rem 0 4rem 0;
          background: linear-gradient(135deg, #00bfa5 0%, rgb(32, 173, 183) 100%);
          border-radius: 24px;
          color: white;
          position: relative;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0, 191, 165, 0.2);
        }

        .hero-section::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
          animation: float 6s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }

        .hero-section h1 {
          font-size: 3.5rem;
          font-weight: 800;
          margin-bottom: 1rem;
          text-shadow: 0 2px 4px rgba(0,0,0,0.1);
          position: relative;
          z-index: 1;
        }

        .hero-section p {
          font-size: 1.3rem;
          opacity: 0.95;
          max-width: 600px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .content-wrapper {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          margin-bottom: 3rem;
        }

        .info-section {
          background: white;
          padding: 2.5rem;
          border-radius: 20px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.08);
          border: 1px solid rgba(255,255,255,0.2);
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .info-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #00bfa5, #00d4aa);
          transform: scaleX(0);
          transition: transform 0.3s ease;
        }

        .info-section:hover::before {
          transform: scaleX(1);
        }

        .info-section:hover {
          transform: translateY(-8px);
          box-shadow: 0 16px 48px rgba(0,0,0,0.12);
        }

        .info-section h2 {
          color: #1f2f45;
          font-size: 1.8rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .info-section h2::before {
          content: '';
          width: 8px;
          height: 8px;
          background: linear-gradient(45deg, #00bfa5, rgb(71, 150, 134));
          border-radius: 50%;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.2); opacity: 0.7; }
        }

        .info-section p,
        .info-section ul {
          color: #4a5568;
          font-size: 1.1rem;
          line-height: 1.7;
        }

        .info-section ul {
          list-style: none;
          padding-left: 0;
        }

        .info-section li {
          position: relative;
          padding-left: 2rem;
          margin-bottom: 0.8rem;
        }

        .info-section li::before {
          content: '✓';
          position: absolute;
          left: 0;
          color: #00bfa5;
          font-weight: bold;
          font-size: 1.2rem;
        }

        .location-section {
          grid-column: 1 / -1;
          background: linear-gradient(135deg, #667eea 0%, rgb(0, 255, 255) 100%);
          color: white;
          position: relative;
          padding: 2rem;
        }

        .stats-section {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
          margin: 3rem 0;
        }

        .stat-card {
          background: white;
          padding: 2rem;
          border-radius: 16px;
          text-align: center;
          box-shadow: 0 4px 16px rgba(0,0,0,0.08);
        }

        .stat-number {
          font-size: 2.5rem;
          font-weight: 800;
          color: #00bfa5;
        }

        .stat-label {
          color: #4a5568;
          font-size: 0.9rem;
          text-transform: uppercase;
        }

        @media screen and (max-width: 768px) {
          .content-wrapper {
            grid-template-columns: 1fr;
          }

          .hero-section {
            padding: 3rem 1rem;
          }

          .hero-section h1 {
            font-size: 2.5rem;
          }

          .hero-section p {
            font-size: 1.1rem;
          }

          .stats-section {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media screen and (max-width: 480px) {
          .hero-section h1 {
            font-size: 2rem;
          }

          .stats-section {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <Navbar />

      <div className="public-page-container">
        <section className="hero-section">
          <h1>Bienvenidos a FisioPlus</h1>
          <p>Tu espacio de confianza para la recuperación física y el bienestar integral</p>
        </section>

        <div className="stats-section">
          <div className="stat-card">
            <div className="stat-number">500+</div>
            <div className="stat-label">Pacientes Satisfechos</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">5+</div>
            <div className="stat-label">Años de Experiencia</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">15+</div>
            <div className="stat-label">Especialidades</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">98%</div>
            <div className="stat-label">Tasa de Recuperación</div>
          </div>
        </div>

        <div className="content-wrapper">
          <section className="info-section">
            <h2>¿Quiénes somos?</h2>
            <p>
              En <strong>FisioPlus</strong> somos una clínica especializada en fisioterapia y
              rehabilitación integral. Nos dedicamos a mejorar la calidad de vida de nuestros
              pacientes mediante tratamientos personalizados, atención empática y tecnología de
              vanguardia.
            </p>
          </section>

          <section className="info-section">
            <h2>Nuestra misión</h2>
            <p>
              Brindar servicios de fisioterapia de alta calidad enfocados en la recuperación
              funcional, la prevención del dolor crónico y la promoción de hábitos saludables para
              una vida plena.
            </p>
          </section>

          <section className="info-section">
            <h2>Nuestros valores</h2>
            <ul>
              <li><strong>Compromiso:</strong> con tu salud y bienestar integral.</li>
              <li><strong>Profesionalismo:</strong> atención basada en evidencia científica.</li>
              <li><strong>Calidez humana:</strong> un trato cercano y personalizado.</li>
              <li><strong>Innovación:</strong> uso de herramientas y técnicas modernas.</li>
            </ul>
          </section>

          <section className="info-section location-section">
            <h2>¿Dónde estamos ubicados?</h2>
            <p>
              Nuestra clínica se encuentra en el corazón de la ciudad, con fácil acceso y ambientes
              diseñados para tu comodidad. Contamos con instalaciones modernas, estacionamiento
              disponible y horarios flexibles para adaptarnos a tu rutina. ¡Te esperamos para
              ayudarte a sentirte mejor cada día!
            </p>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ClinicaPublic;
