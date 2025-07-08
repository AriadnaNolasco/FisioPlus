import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../css/EjerciciosPage.css';

const EjerciciosPage = () => {
  const [ejercicios, setEjercicios] = useState([]);
  const [search, setSearch] = useState('');
  const [filtro, setFiltro] = useState('todos');
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    setEjercicios([
      {
        id: 1,
        nombre: "Estiramiento de cuello",
        descripcion: "Gira la cabeza suavemente de un lado a otro.",
        repeticiones: "3 series de 10",
        videoUrl: "https://www.youtube.com/watch?v=w4H0N_h_G9U",
        tipo: "flexibilidad",
      },
      {
        id: 2,
        nombre: "Ejercicio lumbar",
        descripcion: "Acostado boca arriba, eleva la pelvis.",
        repeticiones: "4 series de 15",
        videoUrl: "https://www.youtube.com/watch?v=2L2lnxIcNmo",
        tipo: "pasivo",
      },
      {
        id: 3,
        nombre: "Flexiones de brazo",
        descripcion: "Apoya las manos en el suelo y baja el cuerpo.",
        repeticiones: "4 series de 12",
        videoUrl: "https://www.youtube.com/watch?v=IODxDxX7oi4",
        tipo: "activo",
      },
      {
        id: 4,
        nombre: "Sentadillas",
        descripcion: "Flexiona las piernas manteniendo la espalda recta.",
        repeticiones: "3 series de 20",
        videoUrl: "https://www.youtube.com/watch?v=aclHkVaku9U",
        tipo: "fortalecimiento",
      },
      {
        id: 5,
        nombre: "Plancha abdominal",
        descripcion: "Mantén el cuerpo recto apoyado en antebrazos y pies.",
        repeticiones: "3 series de 30 segundos",
        videoUrl: "https://www.youtube.com/watch?v=pSHjTRCQxIw",
        tipo: "fortalecimiento",
      },
      {
        id: 6,
        nombre: "Puente de glúteos",
        descripcion: "Acostado boca arriba, levanta las caderas hacia el techo.",
        repeticiones: "4 series de 10",
        videoUrl: "https://www.youtube.com/watch?v=FOE4eoO4nOk",
        tipo: "fortalecimiento",
      },
      {
        id: 7,
        nombre: "Estiramiento de cuello",
        descripcion: "Gira la cabeza suavemente de un lado a otro.",
        repeticiones: "3 series de 10",
        videoUrl: "https://youtu.be/Ms-DnIugD8w?si=IusduVYwOahVtU3S",
        tipo: "pasivo",
      },
      {
        id: 8,
        nombre: "Ejercicio lumbar",
        descripcion: "Acostado boca arriba, eleva la pelvis.",
        repeticiones: "4 series de 15",
        videoUrl: "https://youtu.be/XIU3xE3T5H4?si=DS8XQUfhJbXXZzYk",
        tipo: "pasivo",
      },
      {
        id: 9,
        nombre: "Ejercicio de flexibilidad",
        descripcion: "Estiramiento de espalda y piernas.",
        repeticiones: "4 series de 30 segundos",
        videoUrl: "https://youtu.be/jxs_2ywG3YU?si=Hv_tW0siYPtl5eTM",
        tipo: "pasivo",
      },
      {
        id: 10,
        nombre: "Ejercicio de estiramiento",
        descripcion: "Estiramiento de espalda y piernas.",
        repeticiones: "4 series de 30 segundos",
        videoUrl: "https://youtu.be/O_XD_3dtkXw?si=iGJfoVJ7R9sutBsS",
        tipo: "pasivo",
      },
      {
        id: 11,
        nombre: "Ejercicios terapéuticos para la epicondilitis",
        descripcion: "Ejercicios específicos para la epicondilitis.",
        repeticiones: "4 series de 15",
        videoUrl: "https://youtu.be/PNDVzRJh3uQ?si=aSbhue4FqZuM8jit",
        tipo: "terapia",
      },
      {
        id: 12,
        nombre: "Ejercicios para la rectificación cervical",
        descripcion: "Realiza estos ejercicios para mejorar la rectificación cervical.",
        repeticiones: "4 series de 15",
        videoUrl: "https://www.youtube.com/live/KgajYrbUCew?si=AELVEb8S94k3SWs5",
        tipo: "terapia",
      },
      {
        id: 13,
        nombre: "Rutina de ejercicios para parálisis facial",
        descripcion: "Realiza estos ejercicios para la parálisis facial.",
        repeticiones: "4 series de 12",
        videoUrl: "https://youtu.be/Ms-DnIugD8w?si=XNiFiKWrMwJ4hVpW",
        tipo: "terapia",
      },
      {
        id: 14,
        nombre: "Rutina de ejercicios para la parálisis facial",
        descripcion: "Ejercicios terapéuticos para la parálisis facial.",
        repeticiones: "4 series de 12",
        videoUrl: "https://www.canva.com/design/DAGY8HKAp10/6Ab68F7sTwDmveo7pb8U0Q/edit?utm_content=DAGY8HKAp10&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton",
        tipo: "terapia",
      }
    ]);
  }, []);

  const ejerciciosFiltrados = ejercicios.filter(ej => 
    (filtro === 'todos' || ej.tipo === filtro) && ej.nombre.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Navbar />

      <div className="homepage2-background">
        <main className="ejercicios-container">
          <div className="ejercicios-header">
            <h2>Ejercicios Recomendados </h2>
            <input
              type="text"
              placeholder="¿Qué estás buscando?"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="filters">
            <button onClick={() => setFiltro('todos')}>Todos</button>
            <button onClick={() => setFiltro('activo')}>Ejercicios Activos</button>
            <button onClick={() => setFiltro('pasivo')}>Ejercicios Pasivos</button>
            <button onClick={() => setFiltro('fortalecimiento')}>Ejercicios de Fortalecimiento</button>
            <button onClick={() => setFiltro('flexibilidad')}>Ejercicios de Flexibilidad</button>
          </div>

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

        <Footer />
      </div>
    </>
  );
};

export default EjerciciosPage;
