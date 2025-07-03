// src/components/Footer.jsx
import { Link } from 'react-router-dom';
import '../css/Footer.css'; // Crea este archivo para estilos personalizados

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        
        <div className="footer-brand">
          <h4>FisioPlus</h4>
          <p>Tu plataforma de salud y bienestar</p>
        </div>

        <div className="footer-links">
          <h5>Explorar</h5>
          <Link to="/clinica">Clínica</Link>
          <Link to="/tratamientos">Tratamientos</Link>
          <Link to="/especialidades">Especialidades</Link>
          <Link to="/contacto">Contacto</Link>
        </div>

        <div className="footer-legal">
          <h5>Legal</h5>
          <Link to="#">Política de privacidad</Link>
          <Link to="#">Términos y condiciones</Link>
        </div>

        <div className="footer-social">
          <h5>Síguenos</h5>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </div>
      </div>

      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} FisioPlus. Todos los derechos reservados.
      </div>
    </footer>
  );
};

export default Footer;
