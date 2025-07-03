// src/pages/TerapeutasPublic.jsx

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import bannerbg from '../assets/img/banner-bg.png';

const TerapeutasPublic = () => {
  return (
    <>
      <style>{`
        .public-page-container {
          max-width: 1000px;
          margin: 4rem auto;
          padding: 2rem 1.5rem;
          font-family: 'Segoe UI', sans-serif;
          background-color: rgba(255, 255, 255, 0.9);
          border-radius: 16px;
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.05);
          position: relative;
          z-index: 1;
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

        .therapist-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
        }

        .therapist-card {
          background-color: #ffffff;
          border-radius: 16px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.06);
          padding: 1.5rem;
          text-align: center;
          transition: transform 0.3s ease-in-out;
        }

        .therapist-card:hover {
          transform: translateY(-5px);
        }

        .therapist-card img {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          object-fit: cover;
          margin-bottom: 1rem;
        }

        .therapist-card h3 {
          font-size: 1.2rem;
          color: #00bfa5;
          margin-bottom: 0.5rem;
        }

        .therapist-card p {
          font-size: 0.95rem;
          color: #444;
        }

        @media screen and (max-width: 600px) {
          .hero-section h1 {
            font-size: 2rem;
          }
        }

        .background-wrapper {
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          background-attachment: fixed;
          min-height: 100vh;
          padding: 2rem 0;
        }
      `}</style>

      <Navbar />

      <div
      
        className="background-wrapper"
        style={{ backgroundImage: `url(${bannerbg})` }}
      >
        <div className="public-page-container">
          <section className="hero-section">
            <h1>Conoce a Nuestros Terapeutas</h1>
            <p>Profesionales comprometidos con tu salud física y bienestar</p>
          </section>

          <section className="therapist-grid">
            <div className="therapist-card">
              <img src="/images/terapeuta1.jpg" alt="Dra. Ana López" />
              <h3>Dra. Ana López</h3>
              <p>Especialista en Fisioterapia Neurológica. 10+ años de experiencia con pacientes con ACV y Parkinson.</p>
            </div>

            <div className="therapist-card">
              <img src="/images/terapeuta2.jpg" alt="Lic. Marco Pérez" />
              <h3>Lic. Marco Pérez</h3>
              <p>Fisioterapeuta Deportivo. Apoya a deportistas profesionales y aficionados en recuperación de lesiones.</p>
            </div>

            <div className="therapist-card">
              <img src="/images/terapeuta3.jpg" alt="Dra. Sofía Ramírez" />
              <h3>Dra. Sofía Ramírez</h3>
              <p>Experta en Salud Pélvica y rehabilitación postparto. Atención integral y con enfoque confidencial.</p>
            </div>

            <div className="therapist-card">
              <img src="/images/terapeuta4.jpg" alt="Lic. Javier Medina" />
              <h3>Lic. Javier Medina</h3>
              <p>Especialista en adultos mayores y fisioterapia respiratoria. Enfoque preventivo y funcional.</p>
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default TerapeutasPublic;
