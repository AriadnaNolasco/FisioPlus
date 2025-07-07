import { useState } from "react";
import axios from "../api/axios";
import "../css/Chatbot.css";

const Chatbot = () => {
  const [input, setInput] = useState("");
  const [chat, setChat] = useState([]);
  const [isOpen, setIsOpen] = useState(false);  // Controla si el chat está abierto
  const [showIcon, setShowIcon] = useState(true); // Muestra el ícono de burbuja cuando está cerrado

  const enviarPregunta = async () => {
    if (!input.trim()) return;

    // Agregar el mensaje del usuario al chat
    setChat((prevChat) => [
      ...prevChat,
      { from: "user", text: input },
    ]);

    try {
      // Enviar la pregunta al backend y obtener la respuesta del bot
      const res = await axios.post("/chatbot/preguntar", { pregunta: input });
      setChat((prevChat) => [
        ...prevChat,
        { from: "bot", text: res.data },
      ]);
    } catch {
      // En caso de error, mostrar un mensaje de error
      setChat((prevChat) => [
        ...prevChat,
        { from: "bot", text: "Error: no puedo responder ahora." },
      ]);
    }

    // Limpiar el campo de entrada
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      enviarPregunta();
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen); // Abre o cierra el chat
    setShowIcon(false); // Oculta el ícono cuando el chat se abre
  };

  const closeChat = () => {
    setIsOpen(false); // Cierra el chat y lo guarda en la burbuja
    setShowIcon(true); // Muestra el ícono de la burbuja flotante
  };

  return (
    <div className="chatbot-container">
      {showIcon && (
        <div className="chatbot-icon" onClick={toggleChat}>
          <img src="/images/bot-image.png" alt="Chatbot" />
        </div>
      )}

      <div className={`chatbot-chatbox ${isOpen ? "open" : "closed"}`}>
        <div className="chatbot-header">
          <span>CapyTherapy</span>
          <span className="status"></span>
        </div>

        <div className="chatbot-messages">
          {chat.map((msg, i) => (
            <div key={i} className={`chatbot-message ${msg.from}`}>
              {msg.from === "bot" && (
                <img
                  src="/images/bot-image.png"
                  alt="Bot"
                  className="bot-image"
                />
              )}
              <p>{msg.text}</p>
            </div>
          ))}
        </div>

        <div className="chatbot-input-container">
          <input
            className="chatbot-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Escribe tu pregunta..."
          />
          <button className="chatbot-send-btn" onClick={enviarPregunta}>
            Enviar
          </button>
        </div>

        {/* Botón para cerrar el chat y guardar como burbuja */}
        <button className="chatbot-close-btn" onClick={closeChat}>
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
