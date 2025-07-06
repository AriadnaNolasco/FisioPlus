import { useEffect, useState, useContext } from 'react';
import axios from '../api/axios';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { AuthContext } from '../auth/AuthContext';
import '../css/PerfilPage.css';

const PerfilPage = () => {
  const { user } = useContext(AuthContext);
  const [perfil, setPerfil] = useState(null);
  const [error, setError] = useState(null);
  const [editar, setEditar] = useState(false); // Estado para controlar si estamos en modo de edición
  const [usuarioDTO, setUsuarioDTO] = useState({
    username: '',
    firstName: '',
    lastName: '',
    email: ''
  });

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      setError("No hay token disponible. Inicia sesión primero.");
      return;
    }

    axios.get('/auth/perfil', {
      headers: { Authorization: `Bearer ${user.accesstoken}` }
    })
      .then(res => {
        setPerfil(res.data);
        setUsuarioDTO({
          username: res.data.username,  // Agregar el campo 'username'
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          email: res.data.email
        });
      })
      .catch(err => setError("No se pudo cargar el perfil. Inicia sesión nuevamente."));
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuarioDTO({
      ...usuarioDTO,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put('/auth/editarPerfil', usuarioDTO, {
      headers: { Authorization: `Bearer ${user.accesstoken}` }
    })
      .then(res => {
        setPerfil(res.data);
        setEditar(false); // Deshabilitar modo edición
      })
      .catch(err => setError("No se pudo actualizar el perfil."));
  };

  return (
    <>
      <Navbar />
      <div className="perfil-page-container">
        <div className="perfil-card">
          {/* Logo en lugar del título "Mi Perfil" */}

          {error && <p className="error">{error}</p>}
          {!perfil && !error && <p className="loading">Cargando...</p>}

          {perfil && !editar && (
            <div className="perfil-details">
              {/* Imagen de perfil */}
              <div
                className="avatar"
                style={{
                  backgroundImage: `url(${perfil.avatar ? perfil.avatar : '/images/perfil-icon.png'})`,
                }}
              ></div>

              <p><strong>Usuario:</strong> {perfil.username}</p>
              <p><strong>Nombre:</strong> {perfil.firstName} {perfil.lastName}</p>
              <p><strong>Email:</strong> {perfil.email}</p>
              <p><strong>Fecha de registro:</strong> {new Date(perfil.dateJoined).toLocaleDateString()}</p>

              <button className="edit-btn" onClick={() => setEditar(true)}>Editar Perfil</button>
            </div>
          )}

          {editar && (
            <form onSubmit={handleSubmit} className="perfil-form">
              <label htmlFor="username">Usuario:</label>
              <input
                type="text"
                id="username"
                name="username"
                value={usuarioDTO.username}
                onChange={handleChange}
              />
              <label htmlFor="firstName">Nombre:</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={usuarioDTO.firstName}
                onChange={handleChange}
              />
              <label htmlFor="lastName">Apellido:</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={usuarioDTO.lastName}
                onChange={handleChange}
              />
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={usuarioDTO.email}
                onChange={handleChange}
              />
              <button type="submit" className="save-btn">Guardar Cambios</button>
            </form>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PerfilPage;
