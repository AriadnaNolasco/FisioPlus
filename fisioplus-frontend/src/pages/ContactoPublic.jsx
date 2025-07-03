// src/pages/ContactoPublic.jsx

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import bannerbg from '../assets/img/banner-bg.png';

const ContactoPublic = () => {
  return (
    <>
      <style>{`
        .background-wrapper {
          background-image: url('${bannerbg}');
          background-size: cover;
          background-repeat: no-repeat;
          background-position: center;
          min-height: 100vh;
          padding: 4rem 0;
                                padding: 100px 1.5rem 0 1.5rem; /* 100px arriba, 0 abajo */

        }

        .public-page-container {
          max-width: 900px;
          margin: 0 auto;
          padding: 2rem 1.5rem;
          font-family: 'Segoe UI', sans-serif;
          background-color: rgba(255, 255, 255, 0.95); /* Fondo claro translúcido */
          border-radius: 20px;
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.06);
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

        .contact-info {
          background-color: #f9f9f9;
          padding: 2rem;
          border-radius: 16px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.05);
          margin-bottom: 2rem;
        }

        .contact-info h3 {
          color: #00bfa5;
          margin-bottom: 1rem;
        }

        .contact-info p {
          margin: 0.5rem 0;
          color: #333;
        }

        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .contact-form input,
        .contact-form textarea {
          padding: 0.8rem 1rem;
          font-size: 1rem;
          border: 1px solid #ccc;
          border-radius: 8px;
          resize: none;
        }

        .contact-form button {
          align-self: flex-start;
          background-color: #00796b;
          color: white;
          padding: 0.8rem 2rem;
          font-size: 1rem;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: background 0.3s ease-in-out;
        }

        .contact-form button:hover {
          background-color: #004d40;
        }

        @media screen and (max-width: 600px) {
          .hero-section h1 {
            font-size: 2rem;
          }

          .contact-form button {
            width: 100%;
            text-align: center;
          }
        }
      `}</style>

      <Navbar />

      <div className="background-wrapper">
        <div className="public-page-container">
          <section className="hero-section">
            <h1>Contáctanos</h1>
            <p>Estamos aquí para resolver tus dudas y ayudarte a empezar tu tratamiento</p>
          </section>

          <div className="contact-info">
            <h3>Información de contacto</h3>
            <p><strong>Teléfono:</strong> +51 999 123 456</p>
            <p><strong>Email:</strong> contacto@fisioplus.pe</p>
            <p><strong>Dirección:</strong> Av. Salud 123, Lima, Perú</p>
            <p><strong>Horario:</strong> Lunes a Viernes, 8:00am – 6:00pm</p>
          </div>

          <form className="contact-form">
            <input type="text" placeholder="Nombre completo" required />
            <input type="email" placeholder="Correo electrónico" required />
            <textarea rows="5" placeholder="Escribe tu mensaje aquí..." required />
            <button type="submit">Enviar mensaje</button>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ContactoPublic;
