import React, { useState } from 'react';

const CrearReglaForm = ({ onClose, onReglaCreada }) => {
  const [diaSemana, setDiaSemana] = useState('');
  const [horaInicio, setHoraInicio] = useState('');
  const [horaFin, setHoraFin] = useState('');
  const [duracion, setDuracion] = useState(60); // en minutos

  const handleSubmit = (e) => {
    e.preventDefault();

    const nuevaRegla = {
      dia_semana: diaSemana,
      hora_inicio: horaInicio,
      hora_fin: horaFin,
      duracion_cita: duracion,  // Si tu backend lo soporta
      // agrega otros campos necesarios, p.ej. terapeuta si no está implícito
    };

    api.post('/horarios/', nuevaRegla)
      .then(res => {
        onReglaCreada(res.data);
        onClose();
      })
      .catch(err => {
        console.error('Error creando regla:', err);
        alert('Error creando regla');
      });
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit}>
        <label>Día de la Semana:</label>
        <select value={diaSemana} onChange={e => setDiaSemana(e.target.value)} required>
          <option value="">Selecciona un día</option>
          <option value="LUNES">Lunes</option>
          <option value="MARTES">Martes</option>
          <option value="MIERCOLES">Miércoles</option>
          <option value="JUEVES">Jueves</option>
          <option value="VIERNES">Viernes</option>
          <option value="SABADO">Sábado</option>
          <option value="DOMINGO">Domingo</option>
        </select>

        <label>Hora Inicio:</label>
        <input type="time" value={horaInicio} onChange={e => setHoraInicio(e.target.value)} required />

        <label>Hora Fin:</label>
        <input type="time" value={horaFin} onChange={e => setHoraFin(e.target.value)} required />

        <label>Duración (minutos):</label>
        <input type="number" min="15" max="180" value={duracion} onChange={e => setDuracion(e.target.value)} required />

        <button type="submit">Guardar Regla</button>
        <button type="button" onClick={onClose}>Cancelar</button>
      </form>
    </div>
  );
};

export default CrearReglaForm;
