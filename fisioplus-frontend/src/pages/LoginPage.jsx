// ------------------------------
// Imports de React y librerías externas
// ------------------------------
import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from '../api/axios';
import 'animate.css';
import TrackVisibility from 'react-on-screen';

// ------------------------------
// Contexto de autenticación
// ------------------------------
import { AuthContext } from '../auth/AuthContext';

// ------------------------------
// Firebase (login con Google)
// ------------------------------
import { auth, provider, signInWithPopup } from '../firebase';

// ------------------------------
// Estilos
// ------------------------------
import '../css/LoginPage.css';

// ------------------------------
// Componente LoginPage
// ------------------------------
const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    usernameOrEmail: '',
    password: '',
  });

  const [error, setError] = useState('');

  // ------------------------------
  // Manejar cambios en inputs
  // ------------------------------
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ------------------------------
  // Envío de formulario (login normal)
  // ------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/auth/login', form);
      login({ ...res.data, token: res.data.token });
      localStorage.setItem('token', res.data.token);
      navigate('/home');
    } catch (err) {
      console.error("Error al iniciar sesión:", err);
      setError("Credenciales inválidas");
    }
  };

  // ------------------------------
  // Login con Google
  // ------------------------------
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const googleData = {
        email: user.email,
        username: user.displayName.replace(/\s/g, '').toLowerCase(),
        firstName: user.displayName.split(' ')[0],
        lastName: user.displayName.split(' ').slice(1).join(' ') || 'GoogleUser',
        password: user.uid, // Dummy password
      };

      const res = await axios.post('/auth/google', googleData);
      login({ ...res.data, token: res.data.token });
      localStorage.setItem('token', res.data.token);
      navigate('/home');
    } catch (err) {
      console.error('Error con Google Login:', err);
      setError('Error al iniciar sesión con Google');
    }
  };

  // ------------------------------
  // Renderización
  // ------------------------------
  return (
    <div className="login-container">

      {/* Botón volver a inicio (esquina superior izquierda) */}
      <Link to="/" className="back-home-button">
        <img src="/images/icon-home.svg" alt="Inicio" className="home-icon" />
        Ir a la página de inicio
      </Link>

      {/* Columna izquierda: Formulario */}
      <form className="login-form" onSubmit={handleSubmit}>
        
        {/* Logo textual del centro */}
        <div className="login-header">
          <div className="logo-text">
            <h1 className="logo-title">FISIOPLUS<br />RAFAEL</h1>
          </div>

          <div className="separator-bar"></div>

          <div className="logo-subtitle">
            Centro de <br />
            Fisioterapia <br />
            especializado
          </div>
        </div>

        {/* Subtítulo */}
        <p className="login-subtext">
          Accede a tu espacio de rehabilitación personalizada
        </p>

        {/* Campos */}
        <div className="login-fields">
          <input 
            type="text" 
            name="usernameOrEmail" 
            placeholder="Usuario o Email" 
            onChange={handleChange} 
            required 
          />
          <input 
            type="password" 
            name="password" 
            placeholder="Contraseña" 
            onChange={handleChange} 
            required 
          />
        </div>

        {/* Botón principal */}
        <button type="submit" className="primary-button">
          Ingresar
        </button>

        {/* Separador "o" */}
        <div className="divider">
          <span>o</span>
        </div>

        {/* Botón Google */}
        <button 
          type="button" 
          onClick={handleGoogleLogin} 
          className="google-button"
        >
          <img src="/images/google-icon.svg" alt="Google" />
          Continuar con Google
        </button>

        {/* Error */}
        {error && <p className="error">{error}</p>}

        {/* Enlace a registro */}
        <p className="register-link">
          ¿No tienes una cuenta? <Link to="/register">Regístrate aquí</Link>
        </p>
      </form>

<TrackVisibility>
  {({ isVisible }) =>
    <div className={isVisible ? "animate__animated animate__zoomIn" : ""}>
      <img
        src="/images/login-image.png"
        alt="Login"
        className="float-img"
        style={{ marginTop: "-100px", maxWidth: "200%" }}
      />
    </div>
  }
</TrackVisibility>

    </div>
  );
};

export default LoginPage;
