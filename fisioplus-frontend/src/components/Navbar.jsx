// src/components/Navbar.jsx

import { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "../css/Navbar.css";

const NavbarComponent = () => {
  const [auth, setAuth] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("inicio");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setAuth(!!token);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  const handleLogoClick = () => {
    auth ? navigate("/home") : navigate("/");
  };

  const onUpdateActiveLink = (value) => {
    setActiveLink(value);
  };

  return (
    <Navbar expand="md" className={scrolled ? "scrolled" : ""}>
      <Container>
        <Navbar.Brand
          onClick={handleLogoClick}
          style={{
            cursor: "pointer",
            color: "#fff",
            fontWeight: "bold",
            fontSize: "24px",
          }}
        >
          FisioPlus
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav">
          <span className="navbar-toggler-icon"></span>
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {auth ? (
              <>
                <Nav.Link
                  as={Link}
                  to="/citas"
                  className={activeLink === "citas" ? "active navbar-link" : "navbar-link"}
                  onClick={() => onUpdateActiveLink("citas")}
                >
                  Citas
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/ejercicios"
                  className={activeLink === "ejercicios" ? "active navbar-link" : "navbar-link"}
                  onClick={() => onUpdateActiveLink("ejercicios")}
                >
                  Ejercicios
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/progreso"
                  className={activeLink === "progreso" ? "active navbar-link" : "navbar-link"}
                  onClick={() => onUpdateActiveLink("progreso")}
                >
                  Progreso
                </Nav.Link>
                <Nav.Link
                  as="button"
                  onClick={handleLogout}
                  className="btn btn-outline-danger ms-2"
                >
                  Cerrar sesión
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/clinica">Clínica</Nav.Link>
                <Nav.Link as={Link} to="/tratamientos">Tratamientos</Nav.Link>
                <Nav.Link as={Link} to="/especialidades">Especialidades</Nav.Link>
                <Nav.Link as={Link} to="/terapeutas">Terapeutas</Nav.Link>
                <Nav.Link as={Link} to="/contacto">Contacto</Nav.Link>
                <Nav.Link as={Link} to="/login">Iniciar sesión</Nav.Link>
                <Nav.Link as={Link} to="/register">Registrarse</Nav.Link>
              </>
            )}
          </Nav>
          {auth && (
            <span className="navbar-text">
              <Link to="/perfil">
                <button className="vvd">
                  <span>Mi cuenta</span>
                </button>
              </Link>
            </span>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;