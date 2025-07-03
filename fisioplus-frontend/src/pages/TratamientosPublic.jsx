// src/pages/TratamientosPublic.jsx

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const TratamientosPublic = () => {
  return (
    <>
      <style>{`
        .public-page-container {
          max-width: 1000px;
          margin: 4rem auto;
          padding: 0 1.5rem;
          font-family: 'Segoe UI', sans-serif;
        }

        .hero-section {
          text-align: center;
          margin-bottom: 3rem;
        }

        .hero-section h1 {
          font-size: 2.5rem;
          color: #1f2f45;
        }

        .hero-section p {
          font-size: 1.2rem;
          color: #555;
        }

        .treatment-section {
          margin-bottom: 2.5rem;
        }

        .treatment-section h2 {
          color: #00bfa5;
          font-size: 1.6rem;
          margin-bottom: 1rem;
        }

        .treatment-section p,
        .treatment-section ul {
          color: #333;
          font-size: 1rem;
          line-height: 1.6;
        }

        .treatment-section ul {
          padding-left: 1.2rem;
          list-style-type: disc;
        }

        .highlight {
          font-weight: bold;
          color: #00796b;
        }

        @media screen and (max-width: 600px) {
          .hero-section h1 {
            font-size: 2rem;
          }

          .treatment-section h2 {
            font-size: 1.3rem;
          }
        }
      `}</style>

      <Navbar />

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

      <Footer />
    </>
  );
};

export default TratamientosPublic;
