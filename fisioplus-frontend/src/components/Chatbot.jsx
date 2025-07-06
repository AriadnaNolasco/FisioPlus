import { useState } from "react";
import axios from "../api/axios";
import "../css/Chatbot.css";

const Chatbot = () => {
  const [input, setInput] = useState("");
  const [chat, setChat] = useState([]);

  const enviarPregunta = async () => {
    if (!input.trim()) return;

    setChat([...chat, { from: "user", text: input }]);
    try {
      const res = await axios.post("/chatbot/preguntar", { pregunta: input }); // Ajuste: enviar objeto con propiedad 'pregunta'
      setChat(prev => [...prev, { from: "bot", text: res.data }]);
    } catch {
      setChat(prev => [...prev, { from: "bot", text: "Error: no puedo responder ahora." }]);
    }
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      enviarPregunta();
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-messages">
        {chat.map((msg, i) => (
          <div key={i} className={`chatbot-message ${msg.from}`}>
            {msg.text}
          </div>
        ))}
      </div>
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
  );
};

export default Chatbot;
