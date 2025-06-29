// ------------------------------
// Imports de React y librerías externas
// ------------------------------

import { useState } from 'react';
import axios from '../api/axios';
import { useNavigate, Link } from 'react-router-dom';
import '../css/RegisterPage.css';
import { auth, provider, signInWithPopup } from '../firebase';

import 'animate.css';
import TrackVisibility from 'react-on-screen';



const RegisterPage = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/auth/registro', form);
      navigate('/login');
    } catch (err) {
      setError('Error al registrarse. Verifica los datos.');
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const googleUser = {
        username: user.displayName.replace(/\s/g, '').toLowerCase(),
        email: user.email,
        firstName: user.displayName.split(' ')[0],
        lastName: user.displayName.split(' ')[1] || '',
        password: user.uid.substring(0, 8), // clave temporal solo para cumplir estructura
      };

      const response = await axios.post('/auth/google', googleUser);

      localStorage.setItem('token', response.data.accessToken);
      navigate('/');
    } catch (error) {
      console.error('Error con Google Sign-In:', error);
      setError('Error al registrarse con Google');
    }
  };


// ------------------------------
// Renderización del componente de registro
// ------------------------------

return (
  <div className="register-container">

{/* Botón volver a inicio (esquina superior izquierda) */}
<Link to="/" className="back-home-button">
  <img src="/images/icon-home.svg" alt="Inicio" className="home-icon" />
  Ir a la página de inicio
</Link>

    
    {/* Sección del formulario */}
    <div className="form-section">
      <form className="register-form" onSubmit={handleSubmit} noValidate>
        <h2>Registrarse</h2>

        {/* Campo: Usuario */}
        <input
          type="text"
          name="username"
          placeholder="Usuario"
          onChange={handleChange}
          required
        />

        {/* Campo: Correo electrónico */}
        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          onChange={handleChange}
          required
        />

        {/* Campo: Nombres */}
        <input
          type="text"
          name="firstName"
          placeholder="Nombres"
          onChange={handleChange}
          required
        />

        {/* Campo: Apellidos */}
        <input
          type="text"
          name="lastName"
          placeholder="Apellidos"
          onChange={handleChange}
          required
        />

        {/* Campo: Contraseña */}
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          onChange={handleChange}
          required
        />

        {/* Botón de envío */}
        <button type="submit">
          Registrar
        </button>

        {/* Botón de Google Sign-In */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
        >
        <img src="/images/google-icon.svg" alt="Google" />
          Registrarse con Google
        </button>

        {/* Mensaje de error */}
        {error && <p className="error-message">{error}</p>}

        {/* Enlace a login */}
        <p className="login-link">
          ¿Ya tienes una cuenta?{' '}
          <Link to="/login">Inicia sesión aquí</Link>
        </p>
      </form>
    </div>

      {/* Imagen decorativa animada */}
<TrackVisibility>
  {({ isVisible }) =>
    <div className={isVisible ? "animate__animated animate__zoomIn" : ""}>
      <img
        src="/images/register.png"
        alt="Login"
        className="float-img"
      />
    </div>
  }
</TrackVisibility>
  

  </div>

  



);
}
export default RegisterPage;


