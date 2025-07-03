import '../css/Chatbot.css'; // Importa el archivo CSS correctamente
import React, { useState } from 'react';
import axios from 'axios';

const Chatbot = () => {
  const [mensaje, setMensaje] = useState('');
  const [respuestas, setRespuestas] = useState([]);
  
  const handleEnviar = async () => {
    try {
      // Cambia la URL al puerto correcto 8085
      const response = await axios.post('http://localhost:8085/chatbot/sendMessage', {
        message: mensaje
      });

      setRespuestas(prev => [...prev, { mensaje, respuesta: response.data }]);
      setMensaje('');
    } catch (error) {
      console.error('Error al interactuar con el Chatbot:', error);
    }
  };

  return (
    <div>
      <div className="chatbot-container">
        {respuestas.map((resp, index) => (
          <div key={index} className="chat-message">
            <p><strong>Usuario:</strong> {resp.mensaje}</p>
            <p><strong>Bot:</strong> {resp.respuesta}</p>
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={mensaje}
          onChange={e => setMensaje(e.target.value)}
          placeholder="Escribe tu mensaje..."
        />
        <button onClick={handleEnviar}>Enviar</button>
      </div>
    </div>
  );
};

export default Chatbot;
