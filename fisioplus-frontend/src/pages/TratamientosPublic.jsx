// src/pages/TratamientosPublic.jsx

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import bannerbg from "../assets/img/banner-bg.png";

const TratamientosPublic = () => {
  return (
    <>
      <style>{`
        .banner-bg {
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          padding-top: 120px;
          padding-bottom: 80px;
          position: relative;
        }

        .banner-bg::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(0, 191, 165, 0.1), rgba(0, 121, 107, 0.05));
          pointer-events: none;
        }

        .public-page-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 3rem 2rem;
          font-family: 'Centra', sans-serif;
          background: rgba(255, 255, 255, 0.98);
          border-radius: 24px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          position: relative;
          z-index: 1;
        }

        .hero-section {
          text-align: center;
          margin-bottom: 4rem;
          position: relative;
        }

        .hero-section h1 {
          font-size: 3.5rem;
          background: linear-gradient(135deg, #00bfa5, #00796b);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-weight: 900;
          margin-bottom: 1.5rem;
          letter-spacing: -0.02em;
        }

        .hero-section p {
          font-size: 1.3rem;
          color: #5a6c7d;
          max-width: 800px;
          margin: 0 auto;
          line-height: 1.6;
          font-weight: 400;
        }

        .treatments-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2.5rem;
          margin-bottom: 3rem;
        }

        .treatment-card {
          background: linear-gradient(135deg, #ffffff, #f8fdfc);
          border-radius: 16px;
          padding: 2.5rem;
          border: 1px solid rgba(0, 191, 165, 0.1);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .treatment-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #00bfa5, #00796b);
        }

        .treatment-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 40px rgba(0, 191, 165, 0.15);
          border-color: rgba(0, 191, 165, 0.2);
        }

        .treatment-card h3 {
          color: #1a202c;
          font-size: 1.5rem;
          margin-bottom: 1rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .treatment-icon {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #00bfa5, #00796b);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
          color: white;
          flex-shrink: 0;
        }

        .treatment-card p {
          color: #4a5568;
          font-size: 1.05rem;
          line-height: 1.7;
          margin-bottom: 1.5rem;
        }

        .treatment-features {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .treatment-features li {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 0.75rem;
          color: #2d3748;
          font-size: 0.95rem;
        }

        .treatment-features li::before {
          content: '✓';
          width: 20px;
          height: 20px;
          background: linear-gradient(135deg, #00bfa5, #00796b);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          font-size: 0.8rem;
          flex-shrink: 0;
        }

        .specialty-section {
          background: linear-gradient(135deg, #f0fdfa, #e6fffa);
          border-radius: 20px;
          padding: 3rem;
          margin-bottom: 3rem;
          border: 1px solid rgba(0, 191, 165, 0.1);
        }

        .specialty-section h2 {
          color: #1a202c;
          font-size: 2.2rem;
          margin-bottom: 1.5rem;
          text-align: center;
          font-weight: 800;
        }

        .specialty-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
        }

        .specialty-item {
          background: rgba(255, 255, 255, 0.8);
          padding: 1.5rem;
          border-radius: 12px;
          border: 1px solid rgba(0, 191, 165, 0.1);
          display: flex;
          align-items: center;
          gap: 1rem;
          transition: all 0.3s ease;
        }

        .specialty-item:hover {
          background: rgba(255, 255, 255, 0.95);
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 191, 165, 0.1);
        }

        .specialty-icon {
          width: 50px;
          height: 50px;
          background: linear-gradient(135deg, #00bfa5, #00796b);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.3rem;
          color: white;
          flex-shrink: 0;
        }

        .specialty-item span {
          color: #2d3748;
          font-weight: 600;
          font-size: 1rem;
        }

        .cta-section {
          text-align: center;
          background: linear-gradient(135deg, #00bfa5, #00796b);
          color: white;
          padding: 3rem;
          border-radius: 20px;
          margin-top: 3rem;
        }

        .cta-section h2 {
          font-size: 2rem;
          margin-bottom: 1rem;
          font-weight: 700;
        }

        .cta-section p {
          font-size: 1.1rem;
          margin-bottom: 2rem;
          opacity: 0.9;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .cta-button {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(255, 255, 255, 0.2);
          color: white;
          padding: 1rem 2rem;
          border-radius: 50px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .cta-button:hover {
          background: rgba(255, 255, 255, 0.3);
          border-color: rgba(255, 255, 255, 0.5);
          transform: translateY(-2px);
        }

        @media screen and (max-width: 768px) {
          .banner-bg {
            padding-top: 100px;
            padding-bottom: 60px;
          }

          .public-page-container {
            margin: 1rem;
            padding: 2rem 1.5rem;
          }

          .hero-section h1 {
            font-size: 2.5rem;
          }

          .hero-section p {
            font-size: 1.1rem;
          }

          .treatments-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .treatment-card {
            padding: 2rem;
          }

          .specialty-section {
            padding: 2rem;
          }

          .specialty-grid {
            grid-template-columns: 1fr;
          }

          .cta-section {
            padding: 2rem;
          }

          .cta-section h2 {
            font-size: 1.7rem;
          }
        }

        @media screen and (max-width: 480px) {
          .hero-section h1 {
            font-size: 2rem;
          }

          .treatment-card h3 {
            font-size: 1.3rem;
          }

          .specialty-section h2 {
            font-size: 1.8rem;
          }
        }
      `}</style>

      <Navbar />

      <div
        className="banner-bg"
        style={{ backgroundImage: `url(${bannerbg})` }}
      >
        <div className="public-page-container">
          <section className="hero-section">
            <h1>Nuestros Tratamientos</h1>
            <p>Soluciones integrales especializadas para mejorar tu movilidad, aliviar el dolor y recuperar tu bienestar con los más altos estándares de calidad</p>
          </section>

          <div className="treatments-grid">
            <div className="treatment-card">
              <h3>
                <div className="treatment-icon">🏥</div>
                Terapia Física General
              </h3>
              <p>
                Tratamientos especializados enfocados en la recuperación integral de lesiones musculoesqueléticas y neurológicas mediante técnicas avanzadas de rehabilitación.
              </p>
              <ul className="treatment-features">
                <li>Ejercicios terapéuticos personalizados</li>
                <li>Movilización articular especializada</li>
                <li>Estiramientos guiados y técnicas de flexibilidad</li>
                <li>Evaluación biomecánica completa</li>
              </ul>
            </div>

            <div className="treatment-card">
              <h3>
                <div className="treatment-icon">⚕️</div>
                Rehabilitación Postoperatoria
              </h3>
              <p>
                Programas de recuperación integral diseñados para optimizar la recuperación después de cirugías ortopédicas y neurológicas, minimizando tiempos de convalecencia.
              </p>
              <ul className="treatment-features">
                <li>Recuperación acelerada de fuerza muscular</li>
                <li>Reeducación del equilibrio y coordinación</li>
                <li>Restauración progresiva de la movilidad</li>
                <li>Seguimiento médico especializado</li>
              </ul>
            </div>

            <div className="treatment-card">
              <h3>
                <div className="treatment-icon">🎯</div>
                Terapia de Dolor Crónico
              </h3>
              <p>
                Planes terapéuticos multidisciplinarios personalizados para el manejo integral de condiciones dolorosas persistentes y mejora de la calidad de vida.
              </p>
              <ul className="treatment-features">
                <li>Manejo de fibromialgia y síndrome de fatiga</li>
                <li>Tratamiento de lumbalgias y cervicalgias</li>
                <li>Terapia para artritis y artrosis</li>
                <li>Técnicas de control del dolor</li>
              </ul>
            </div>
          </div>

          <section className="specialty-section">
            <h2>Técnicas y Modalidades Especializadas</h2>
            <div className="specialty-grid">
              <div className="specialty-item">
                <div className="specialty-icon">💆</div>
                <span>Masoterapia Terapéutica</span>
              </div>
              <div className="specialty-item">
                <div className="specialty-icon">⚡</div>
                <span>Electroterapia Avanzada</span>
              </div>
              <div className="specialty-item">
                <div className="specialty-icon">🏋️</div>
                <span>Fortalecimiento Funcional</span>
              </div>
              <div className="specialty-item">
                <div className="specialty-icon">🧘</div>
                <span>Reeducación Postural</span>
              </div>
              <div className="specialty-item">
                <div className="specialty-icon">🩹</div>
                <span>Vendaje Neuromuscular</span>
              </div>
              <div className="specialty-item">
                <div className="specialty-icon">🌊</div>
                <span>Hidroterapia</span>
              </div>
            </div>
          </section>

          <div className="cta-section">
            <h2>¿Listo para comenzar tu recuperación?</h2>
            <p>
              Nuestro equipo de especialistas evaluará tu condición específica y diseñará un plan terapéutico completamente personalizado. Agenda tu consulta inicial presencial o virtual.
            </p>
            <a href="#" className="cta-button">
              Agendar Consulta
              <span>→</span>
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default TratamientosPublic;