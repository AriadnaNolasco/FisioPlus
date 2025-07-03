// src/pages/ClinicaPublic.jsx

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ClinicaPublic = () => {
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

        .info-section {
          margin-bottom: 2.5rem;
        }

        .info-section h2 {
          color: #00bfa5;
          font-size: 1.6rem;
          margin-bottom: 1rem;
        }

        .info-section p,
        .info-section ul {
          color: #333;
          font-size: 1rem;
          line-height: 1.6;
        }

        .info-section ul {
          padding-left: 1.2rem;
          list-style-type: disc;
        }

        @media screen and (max-width: 600px) {
          .hero-section h1 {
            font-size: 2rem;
          }

          .info-section h2 {
            font-size: 1.3rem;
          }
        }
      `}</style>

      <Navbar />

      <div className="public-page-container">
        <section className="hero-section">
          <h1>Bienvenidos a FisioPlus</h1>
          <p>Tu espacio de confianza para la recuperación física y el bienestar integral</p>
        </section>

        <section className="info-section">
          <h2>¿Quiénes somos?</h2>
          <p>
            En <strong>FisioPlus</strong> somos una clínica especializada en fisioterapia y rehabilitación integral.
            Nos dedicamos a mejorar la calidad de vida de nuestros pacientes mediante tratamientos personalizados,
            atención empática y tecnología de vanguardia.
          </p>
        </section>

        <section className="info-section">
          <h2>Nuestra misión</h2>
          <p>
            Brindar servicios de fisioterapia de alta calidad enfocados en la recuperación funcional, la prevención
            del dolor crónico y la promoción de hábitos saludables.
          </p>
        </section>

        <section className="info-section">
          <h2>Nuestros valores</h2>
          <ul>
            <li><strong>Compromiso:</strong> con tu salud y bienestar.</li>
            <li><strong>Profesionalismo:</strong> atención basada en evidencia científica.</li>
            <li><strong>Calidez humana:</strong> un trato cercano y personalizado.</li>
            <li><strong>Innovación:</strong> uso de herramientas y técnicas modernas.</li>
          </ul>
        </section>

        <section className="info-section">
          <h2>¿Dónde estamos ubicados?</h2>
          <p>
            Nuestra clínica se encuentra en el corazón de la ciudad, con fácil acceso y ambientes diseñados
            para tu comodidad. ¡Te esperamos para ayudarte a sentirte mejor cada día!
          </p>
        </section>
      </div>

      <Footer />
    </>
  );
};

export default ClinicaPublic;
