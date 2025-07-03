// src/pages/PerfilPage.jsx
import { useEffect, useState } from 'react';
import axios from '../api/axios';
import Navbar from '../components/Navbar'; // ✅ Navbar reutilizable
import '../css/PerfilPage.css'; // ✅ Estilo específico
import Footer from '../components/Footer';

const PerfilPage = () => {
  const [perfil, setPerfil] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log("📦 Token desde localStorage:", token); // Debug

    if (!token) {
      setError("No hay token disponible. Inicia sesión primero.");
      return;
    }

    axios.get('/auth/perfil')
      .then(res => {
        console.log("✅ Perfil recibido:", res.data);
        setPerfil(res.data);
      })
      .catch(err => {
        console.error("❌ Error al obtener perfil:", err);
        setError("No se pudo cargar el perfil. Asegúrate de haber iniciado sesión.");
      });
  }, []);

  return (
    <>
      {/* ✅ Navbar reutilizable */}
      <Navbar />

      {/* Fondo y contenido principal */}
      <div className="homepage3-background">
        <div className="homepage-container">
          <div className="page-wrapper">
            <main className="perfil-container">
              <h2>Mi Perfil</h2>

              {error && <p className="perfil-error">{error}</p>}
              {!perfil && !error && <p className="perfil-loading">Cargando perfil...</p>}

              {perfil && (
                <div className="perfil-info">
                  <p><strong>👤 Usuario:</strong> {perfil.username}</p>
                  <p><strong>📛 Nombre:</strong> {perfil.firstName} {perfil.lastName}</p>
                  <p><strong>📧 Email:</strong> {perfil.email}</p>
                  <p><strong>📅 Fecha de registro:</strong> {new Date(perfil.dateJoined).toLocaleDateString()}</p>
                </div>
              )}
            </main>


          </div>
        </div>
          <Footer />

      </div>
    </>
  );
};

export default PerfilPage;
