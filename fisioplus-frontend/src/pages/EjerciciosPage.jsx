// src/pages/EjerciciosPage.jsx

import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';
import Navbar from '../components/Navbar';

import '../css/EjerciciosPage.css';
import '../css/HomePage.css';
import Footer from '../components/Footer';

const EjerciciosPage = () => {
  const [ejercicios, setEjercicios] = useState([]);
  const [search, setSearch] = useState('');
  const { logout } = useContext(AuthContext);

  // ✅ Cargar ejercicios simulados al iniciar
  useEffect(() => {
    setEjercicios([
      {
        id: 1,
        nombre: "Estiramiento de cuello",
        descripcion: "Gira la cabeza suavemente de un lado a otro.",
        repeticiones: "3 series de 10",
        videoUrl: "https://www.youtube.com/watch?v=w4H0N_h_G9U"
      },
      {
        id: 2,
        nombre: "Ejercicio lumbar",
        descripcion: "Acostado boca arriba, eleva la pelvis.",
        repeticiones: "4 series de 15",
        videoUrl: "https://www.youtube.com/watch?v=2L2lnxIcNmo"
      },
      {
        id: 3,
        nombre: "Flexiones de brazo",
        descripcion: "Apoya las manos en el suelo y baja el cuerpo.",
        repeticiones: "4 series de 12",
        videoUrl: "https://www.youtube.com/watch?v=IODxDxX7oi4"
      },
      {
        id: 4,
        nombre: "Sentadillas",
        descripcion: "Flexiona las piernas manteniendo la espalda recta.",
        repeticiones: "3 series de 20",
        videoUrl: "https://www.youtube.com/watch?v=aclHkVaku9U"
      },
      {
        id: 5,
        nombre: "Plancha abdominal",
        descripcion: "Mantén el cuerpo recto apoyado en antebrazos y pies.",
        repeticiones: "3 series de 30 segundos",
        videoUrl: "https://www.youtube.com/watch?v=pSHjTRCQxIw"
      },
      {
        id: 6,
        nombre: "Puente de glúteos",
        descripcion: "Acostado boca arriba, levanta las caderas hacia el techo.",
        repeticiones: "4 series de 10",
        videoUrl: "https://www.youtube.com/watch?v=FOE4eoO4nOk"
      }
    ]);
  }, []);

  // 🔎 Filtro de ejercicios
  const ejerciciosFiltrados = ejercicios.filter(ej =>
    ej.nombre.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {/* ✅ Navbar común */}
      <Navbar />

      {/* 🌄 Fondo y contenido principal */}
      <div className="homepage2-background">
        <main className="ejercicios-container">
          <h2>Ejercicios Recomendados</h2>

          {/* 🔍 Input de búsqueda */}
          <input
            type="text"
            placeholder="Buscar ejercicio..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="search-input"
          />

          {/* 🧘‍♂️ Tarjetas de ejercicios */}
          <div className="ejercicios-grid">
            {ejerciciosFiltrados.map(ej => (
              <div key={ej.id} className="ejercicio-card">
                <iframe
                  src={ej.videoUrl.replace("watch?v=", "embed/")}
                  title={ej.nombre}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="video-iframe"
                />
                <div className="ejercicio-info">
                  <h4>{ej.nombre}</h4>
                  <p>{ej.descripcion}</p>
                  <p><strong>Repeticiones:</strong> {ej.repeticiones}</p>
                </div>
              </div>
            ))}
          </div>
        </main>

        {/* 📌 Pie de página */}
  <Footer />

      </div>
    </>
  );
};

export default EjerciciosPage;
