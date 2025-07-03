// src/pages/EspecialidadesPublic.jsx

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const EspecialidadesPublic = () => {
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

        .specialty-section {
          margin-bottom: 2.5rem;
        }

        .specialty-section h2 {
          color: #00bfa5;
          font-size: 1.6rem;
          margin-bottom: 1rem;
        }

        .specialty-section p,
        .specialty-section ul {
          color: #333;
          font-size: 1rem;
          line-height: 1.6;
        }

        .specialty-section ul {
          padding-left: 1.2rem;
          list-style-type: disc;
        }

        @media screen and (max-width: 600px) {
          .hero-section h1 {
            font-size: 2rem;
          }

          .specialty-section h2 {
            font-size: 1.3rem;
          }
        }
      `}</style>

      <Navbar />

      <div className="public-page-container">
        <section className="hero-section">
          <h1>Nuestras Especialidades</h1>
          <p>Contamos con un equipo multidisciplinario en áreas clave de la fisioterapia moderna</p>
        </section>

        <section className="specialty-section">
          <h2>Fisioterapia Deportiva</h2>
          <p>
            Prevención y tratamiento de lesiones relacionadas con el deporte. Ideal para atletas, aficionados al ejercicio o personas con sobreuso articular.
          </p>
        </section>

        <section className="specialty-section">
          <h2>Fisioterapia Neurológica</h2>
          <p>
            Rehabilitación para pacientes con enfermedades como Parkinson, ACV, parálisis cerebral y neuropatías. Buscamos mejorar la independencia y calidad de vida.
          </p>
        </section>

        <section className="specialty-section">
          <h2>Fisioterapia Geriátrica</h2>
          <p>
            Atención integral para personas mayores, con foco en equilibrio, movilidad, prevención de caídas y tratamiento de enfermedades osteomusculares.
          </p>
        </section>

        <section className="specialty-section">
          <h2>Fisioterapia Respiratoria</h2>
          <p>
            Ideal para pacientes con EPOC, asma o post-COVID. Incluye ejercicios de expansión pulmonar y drenaje bronquial.
          </p>
        </section>

        <section className="specialty-section">
          <h2>Fisioterapia en Salud Pélvica</h2>
          <p>
            Aborda problemas como incontinencia, dolor pélvico crónico y recuperación postparto, con técnicas especializadas y atención confidencial.
          </p>
        </section>

        <section className="specialty-section">
          <h2>¿Tienes dudas sobre cuál especialidad necesitas?</h2>
          <p>
            Nuestro equipo evaluará tu caso y te orientará hacia el tratamiento y especialista más adecuado.
          </p>
        </section>
      </div>

      <Footer />
    </>
  );
};

export default EspecialidadesPublic;
