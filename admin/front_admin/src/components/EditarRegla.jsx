import React, { useState } from 'react';
import api from '../services/api';

const EditarReglaForm = ({ regla, onClose, onReglaActualizada }) => {
  const [diaSemana, setDiaSemana] = useState(regla.dia_semana);
  const [horaInicio, setHoraInicio] = useState(regla.hora_inicio);
  const [horaFin, setHoraFin] = useState(regla.hora_fin);
  const [duracion, setDuracion] = useState(60); // Ajusta si tienes duración

  const handleSubmit = (e) => {
    e.preventDefault();

    const reglaActualizada = {
      dia_semana: diaSemana,
      hora_inicio: horaInicio,
      hora_fin: horaFin,
      duracion_cita: duracion, // si aplica
    };

    api.put(`/horarios/${regla.id}/`, reglaActualizada)
      .then(res => {
        onReglaActualizada(res.data);
      })
      .catch(err => {
        console.error('Error actualizando regla:', err);
        alert('Error al actualizar la regla');
      });
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit}>
        <h3>Editar Regla</h3>
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

        <button type="submit">Guardar Cambios</button>
        <button type="button" onClick={onClose}>Cancelar</button>
      </form>
    </div>
  );
};

export default EditarReglaForm;
