// src/pages/EspecialidadesPublic.jsx

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import bannerbg from '../assets/img/banner-bg.png';

const EspecialidadesPublic = () => {
  return (
    <>
      <style>{`
        .background-wrapper {
          background-image: url('${bannerbg}');
          background-size: cover;
          background-repeat: no-repeat;
          background-position: center;
                      padding: 100px 1.5rem 0 1.5rem; /* 100px arriba, 0 abajo */

        }

        .page-container {
          max-width: 1100px;
          margin: 0 auto;
          padding: 2rem 1.5rem;
          font-family: 'Segoe UI', sans-serif;
          background-color: rgba(255, 255, 255, 0.9); /* Fondo blanco translúcido */
          border-radius: 20px;
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.05);
        }

        .hero-section {
          text-align: center;
          margin-bottom: 4rem;
        }

        .hero-section h1 {
          font-size: 3rem;
          font-weight: 800;
          color: #1f2f45;
        }

        .hero-section p {
          font-size: 1.2rem;
          color: #444;
          max-width: 700px;
          margin: 1rem auto 0;
        }

        .specialties-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          margin-top: 2rem;
        }

        .specialty-card {
          background: #ffffff;
          padding: 2rem;
          border-radius: 20px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.08);
          transition: transform 0.3s ease;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .specialty-card:hover {
          transform: translateY(-6px);
        }

        .specialty-card h2 {
          font-size: 1.5rem;
          color: #1f2f45;
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .specialty-card h2::before {
          content: '';
          width: 8px;
          height: 8px;
          background: #00bfa5;
          border-radius: 50%;
        }

        .specialty-card p {
          color: #4a4a4a;
          font-size: 1.05rem;
          line-height: 1.6;
        }

        @media screen and (max-width: 480px) {
          .hero-section h1 {
            font-size: 2.3rem;
          }

          .specialty-card h2 {
            font-size: 1.3rem;
          }

          .specialty-card {
            padding: 1.5rem;
          }
        }
      `}</style>

      <Navbar />

      <div className="background-wrapper">
        <div className="page-container">
          <section className="hero-section">
            <h1>Nuestras Especialidades</h1>
            <p>Contamos con un equipo multidisciplinario en áreas clave de la fisioterapia moderna</p>
          </section>

          <div className="specialties-grid">
            <div className="specialty-card">
              <h2>Fisioterapia Deportiva</h2>
              <p>
                Prevención y tratamiento de lesiones relacionadas con el deporte. Ideal para atletas, aficionados al ejercicio o personas con sobreuso articular.
              </p>
            </div>

            <div className="specialty-card">
              <h2>Fisioterapia Neurológica</h2>
              <p>
                Rehabilitación para pacientes con enfermedades como Parkinson, ACV, parálisis cerebral y neuropatías. Buscamos mejorar la independencia y calidad de vida.
              </p>
            </div>

            <div className="specialty-card">
              <h2>Fisioterapia Geriátrica</h2>
              <p>
                Atención integral para personas mayores, con foco en equilibrio, movilidad, prevención de caídas y tratamiento de enfermedades osteomusculares.
              </p>
            </div>

            <div className="specialty-card">
              <h2>Fisioterapia Respiratoria</h2>
              <p>
                Ideal para pacientes con EPOC, asma o post-COVID. Incluye ejercicios de expansión pulmonar y drenaje bronquial.
              </p>
            </div>

            <div className="specialty-card">
              <h2>Fisioterapia en Salud Pélvica</h2>
              <p>
                Aborda problemas como incontinencia, dolor pélvico crónico y recuperación postparto, con técnicas especializadas y atención confidencial.
              </p>
            </div>

            <div className="specialty-card">
              <h2>¿No sabes cuál especialidad necesitas?</h2>
              <p>
                Nuestro equipo evaluará tu caso y te orientará hacia el tratamiento y especialista más adecuado.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default EspecialidadesPublic;
