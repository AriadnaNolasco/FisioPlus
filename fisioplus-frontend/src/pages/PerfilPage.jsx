import { useEffect, useState, useContext } from 'react';
import { Modal, Button } from 'react-bootstrap'; // Importar el Modal y Button de react-bootstrap
import { AuthContext } from '../auth/AuthContext'; 
import axios from '../api/axios'; 
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../css/PerfilPage.css';

const PerfilPage = () => {
  const { user } = useContext(AuthContext);
  const [perfil, setPerfil] = useState(null);
  const [error, setError] = useState(null);
  const [editar, setEditar] = useState(false);
  const [usuarioDTO, setUsuarioDTO] = useState({
    username: '',
    firstName: '',
    lastName: '',
    email: ''
  });
  const [showModal, setShowModal] = useState(false); // Controlar la visibilidad del modal
  const [confirmLogout, setConfirmLogout] = useState(false); // Estado para confirmar el cierre de sesión

  // Lógica de apertura y cierre del modal
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    window.location.href = '/login'; // Redirigir a la página de login
  };

  // Lógica para obtener los datos del perfil
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
          username: res.data.username,
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
        setEditar(false); 
      })
      .catch(err => setError("No se pudo actualizar el perfil."));
  };

  const handleBack = () => {
    setEditar(false); 
  };

  return (
    <>
      <Navbar />
      <div className="perfil-page-container">
        <div className="perfil-card">
          {error && <p className="error">{error}</p>}
          {!perfil && !error && <p className="loading">Cargando...</p>}

          {perfil && !editar && (
            <div className="perfil-details">
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
              {/* Botón de Cerrar sesión con modal */}
              <button className="logout-btn" onClick={handleShowModal}>Cerrar sesión</button>
            </div>
          )}

          {editar && (
            <>
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

              <button className="back-btn" onClick={handleBack}>Volver atrás</button>
            </>
          )}
        </div>
      </div>

      {/* Modal de confirmación de cierre de sesión */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Cierre de Sesión</Modal.Title>
        </Modal.Header>
        <Modal.Body>¿Estás seguro de que deseas cerrar sesión?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={() => { handleLogout(); handleCloseModal(); }}>
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>

      <Footer />
    </>
  );
};

export default PerfilPage;
