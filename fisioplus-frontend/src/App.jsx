import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './auth/AuthContext';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage'; // ✅ Página PRIVADA del usuario logueado
import CitasPage from './pages/CitasPage';
import EjerciciosPage from './pages/EjerciciosPage';
import ProgresoPage from './pages/ProgresoPage';
import PerfilPage from './pages/PerfilPage';
import PublicPage from './pages/PublicPage'; // ✅ Página PÚBLICA para visitantes
import PrivateRoute from './routes/PrivateRoute';
import Chatbot from './components/Chatbot';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';



import ClinicaPublic from './pages/ClinicaPublic';
import TratamientosPublic from './pages/TratamientosPublic';
import EspecialidadesPublic from './pages/EspecialidadesPublic';
import TerapeutasPublic from './pages/TerapeutasPublic';
import ContactoPublic from './pages/ContactoPublic';


function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* ✅ Rutas públicas */}
          <Route path="/" element={<PublicPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/clinica" element={<ClinicaPublic />} />
          <Route path="/tratamientos" element={<TratamientosPublic />} />
          <Route path="/especialidades" element={<EspecialidadesPublic />} />
          <Route path="/terapeutas" element={<TerapeutasPublic />} />
          <Route path="/contacto" element={<ContactoPublic />} />


          {/* 🔐 Rutas privadas */}
          <Route path="/home" element={<PrivateRoute><HomePage /></PrivateRoute>} />
          <Route path="/citas" element={<PrivateRoute><CitasPage /></PrivateRoute>} />
          <Route path="/ejercicios" element={<PrivateRoute><EjerciciosPage /></PrivateRoute>} />
          <Route path="/progreso" element={<PrivateRoute><ProgresoPage /></PrivateRoute>} />
          <Route path="/perfil" element={<PrivateRoute><PerfilPage /></PrivateRoute>} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
