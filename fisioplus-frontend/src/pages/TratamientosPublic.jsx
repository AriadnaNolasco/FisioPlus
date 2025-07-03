// src/pages/TratamientosPublic.jsx

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import bannerbg from "../assets/img/banner-bg.png"; // Import directo

const TratamientosPublic = () => {
  return (
    <>
      <style>{`
        .banner-bg {
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          padding-top: 100px;
          padding-bottom: 60px;
        }

        .public-page-container {
          max-width: 1000px;
          margin: 0 auto;
          padding: 2rem 1.5rem;
          font-family: 'Centra', sans-serif;
          background: linear-gradient(to bottom, #f4fdfd, #ffffff);
          border-radius: 16px;
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.05);
        }

        .hero-section {
          text-align: center;
          margin-bottom: 3rem;
        }

        .hero-section h1 {
          font-size: 3rem;
          color: #00bfa5;
          font-weight: 800;
          margin-bottom: 1rem;
        }

        .hero-section p {
          font-size: 1.2rem;
          color: #4a5568;
          max-width: 700px;
          margin: 0 auto;
        }

        .treatment-section {
          margin-bottom: 3rem;
        }

        .treatment-section h2 {
          color: #1f2f45;
          font-size: 1.8rem;
          margin-bottom: 1rem;
          position: relative;
        }

        .treatment-section h2::before {
          content: '';
          display: inline-block;
          width: 8px;
          height: 8px;
          background: #00bfa5;
          border-radius: 50%;
          margin-right: 0.5rem;
          vertical-align: middle;
        }

        .treatment-section p,
        .treatment-section ul {
          color: #333;
          font-size: 1.05rem;
          line-height: 1.7;
        }

        .treatment-section ul {
          padding-left: 1.5rem;
          list-style: none;
        }

        .treatment-section ul li {
          position: relative;
          padding-left: 1.5rem;
          margin-bottom: 0.75rem;
        }

        .treatment-section ul li::before {
          content: '✔';
          position: absolute;
          left: 0;
          color: #00bfa5;
          font-weight: bold;
        }

        .highlight {
          font-weight: bold;
          color: #00796b;
        }

        @media screen and (max-width: 768px) {
          .hero-section h1 {
            font-size: 2.3rem;
          }

          .hero-section p {
            font-size: 1rem;
          }

          .treatment-section h2 {
            font-size: 1.5rem;
          }
        }

        @media screen and (max-width: 480px) {
          .public-page-container {
            margin: 2rem 1rem;
            padding: 1.5rem;
          }

          .hero-section h1 {
            font-size: 2rem;
          }

          .treatment-section h2 {
            font-size: 1.3rem;
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
            <p>Soluciones integrales para mejorar tu movilidad, aliviar el dolor y recuperar tu bienestar</p>
          </section>

          <section className="treatment-section">
            <h2>Terapia Física General</h2>
            <p>
              Tratamientos enfocados en la recuperación de lesiones musculoesqueléticas y neurológicas a través de ejercicios terapéuticos, movilización articular y estiramientos guiados.
            </p>
          </section>

          <section className="treatment-section">
            <h2>Rehabilitación Postoperatoria</h2>
            <p>
              Ayudamos a nuestros pacientes a recuperar fuerza, equilibrio y movilidad después de cirugías ortopédicas o neurológicas, acortando tiempos de recuperación.
            </p>
          </section>

          <section className="treatment-section">
            <h2>Terapia de Dolor Crónico</h2>
            <p>
              Diseñamos planes personalizados para personas que viven con condiciones dolorosas persistentes como fibromialgia, lumbalgias o artrosis.
            </p>
          </section>

          <section className="treatment-section">
            <h2>Tratamientos Disponibles</h2>
            <ul>
              <li>Masoterapia y técnicas de relajación muscular</li>
              <li>Electroterapia (TENS, ultrasonido)</li>
              <li>Ejercicios de fortalecimiento y equilibrio</li>
              <li>Reeducación postural y ergonomía</li>
              <li>Vendaje neuromuscular (kinesiotaping)</li>
              <li>Hidroterapia (si aplica)</li>
            </ul>
          </section>

          <section className="treatment-section">
            <h2>¿Cómo empiezo?</h2>
            <p>
              Nuestro equipo evaluará tu estado físico y diseñará un plan terapéutico a medida. Puedes agendar una consulta presencial o virtual desde nuestro portal.
            </p>
          </section>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default TratamientosPublic;
