package com.fisioplus.user_backend.service.chatbot.impl;

import com.fisioplus.user_backend.service.chatbot.ChatbotService;
import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.Map;

@Service
public class ChatbotServiceImpl implements ChatbotService {

    private final Map<String, String> respuestas = new HashMap<>();

    public ChatbotServiceImpl() {
        respuestas.put("horario", "Nuestro horario de atención es de 8am a 8pm de lunes a viernes.");
        respuestas.put("tipos de terapia", "Ofrecemos terapia manual, ejercicios de rehabilitación y electroterapia.");
        respuestas.put("contacto", "Puedes contactarnos al teléfono 123-456-789 o al email info@fisioplus.com");
    }

    @Override
    public String procesarPregunta(String pregunta) {
        String preguntaLower = pregunta.toLowerCase();
        // Saludos iniciales
        if (preguntaLower.contains("hola") || preguntaLower.contains("buenos días") || preguntaLower.contains("buenas tardes")) {
            return "¡Hola! Bienvenido a FisioPlus. ¿Cómo te sientes hoy? ¿Tienes algún dolor o molestia?";
        }

        // Dolor o molestias
        else if (preguntaLower.contains("me duele el cuello")) {
            return "Para el dolor de cuello, te recomiendo descansar, hacer estiramientos suaves y aplicar calor local. ¿Quieres que te ayude a agendar una cita con un fisioterapeuta?";
        } else if (preguntaLower.contains("si")) {
            return "Ingresa a la pestaña de citas, podras observar los horarios y terapeutas disponibles";
        } else if (preguntaLower.contains("tengo dolor en la espalda")) {
            return "El dolor de espalda es común. Se recomienda mantener buena postura, ejercicios de fortalecimiento y evitar esfuerzos. ¿Quieres recomendaciones específicas o agendar una consulta?";
        } else if (preguntaLower.contains("mi brazo está dolorido")) {
            return "El dolor de brazo puede estar relacionado con esfuerzo muscular. Se recomienda reposo y ejercicios suaves. ¿Deseas que te ayudemos con una cita?";
        } else if (preguntaLower.contains("qué puedo hacer si me duele la cabeza")) {
            return "Te recomiendo consultar con un médico general para el dolor de cabeza. Si es algo más relacionado con tensión muscular, podemos ayudarte con ejercicios de relajación.";
        } else if (preguntaLower.contains("qué ejercicios me pueden ayudar con el dolor lumbar")) {
            return "Te puedo recomendar ejercicios para fortalecer la zona lumbar y mejorar la postura. ¿Te gustaría que te enviemos una rutina personalizada?";

            // Reserva de citas
        } else if (preguntaLower.contains("como puedo reservar una cita")) {
            return "Puedes agendar tu cita a través de la sección 'Gestionar Citas' en nuestra plataforma o llamando al 123-456-789.";
        } else if (preguntaLower.contains("cuales son los horarios disponibles para agendar una cita")) {
            return "Estamos disponibles de lunes a viernes, de 8:00 a.m. a 6:00 p.m. ¿Te gustaría agendar tu cita ahora?";
        } else if (preguntaLower.contains("puedo reservar una cita para mañana")) {
            return "¡Claro! Puedes reservar tu cita para mañana a través de nuestra plataforma o llamando al 123-456-789.";
        } else if (preguntaLower.contains("donde puedo ver las opciones de citas")) {
            return "Puedes ver las opciones de citas disponibles directamente en la sección 'Gestionar Citas' de nuestra plataforma.";

            // Ejercicios
        } else if (preguntaLower.contains("donde puedo ver los ejercicios recomendados")) {
            return "Puedes ver tus ejercicios terapéuticos en la sección 'Mis Ejercicios' en la plataforma. ¿Te gustaría una guía para acceder?";
        } else if (preguntaLower.contains("cuales son los ejercicios diarios para mejorar mi salud")) {
            return "Te recomendaré una rutina diaria enfocada en mejorar tu salud. ¿Quieres que te envíe una lista de ejercicios?";
        } else if (preguntaLower.contains("me podrías enviar una rutina de ejercicios")) {
            return "Claro, te puedo enviar una rutina de ejercicios que se adapte a tus necesidades. ¿Qué área del cuerpo te gustaría trabajar más?";
        } else if (preguntaLower.contains("hay ejercicios específicos para mi condición")) {
            return "Sí, dependiendo de tu condición, podemos recomendarte ejercicios específicos. ¿Me puedes contar más sobre tu situación para ayudarte mejor?";

            // Información de contacto
        } else if (preguntaLower.contains("cuál es su número de teléfono")) {
            return "Puedes llamarnos al 123-456-789 o escribirnos al WhatsApp +51 987 654 321.";
        } else if (preguntaLower.contains("cómo puedo contactar con el centro")) {
            return "Puedes contactarnos por teléfono al 123-456-789 o enviar un mensaje al WhatsApp +51 987 654 321.";
        } else if (preguntaLower.contains("tienen un número de contacto para urgencias")) {
            return "En caso de urgencias, puedes llamarnos al 123-456-789, o también estamos disponibles en WhatsApp +51 987 654 321.";

            // Prevención y recomendaciones
        } else if (preguntaLower.contains("cuáles son las medidas de prevención que debo seguir")) {
            return "Las medidas de prevención incluyen mantener una buena postura, hacer ejercicios de estiramiento regularmente y descansar adecuadamente. ¿Te gustaría recibir más consejos específicos?";
        } else if (preguntaLower.contains("qué consejos tienen para evitar lesiones")) {
            return "Te recomiendo practicar ejercicios de calentamiento antes de cualquier actividad física y tomar descansos adecuados. ¿Te gustaría que te enviemos más consejos?";
        } else if (preguntaLower.contains("cómo puedo cuidar mi salud a largo plazo")) {
            return "Es importante mantener una rutina de ejercicios, llevar una dieta balanceada y descansar lo suficiente. Si deseas más detalles, podemos ofrecerte un plan personalizado.";

            // Agradecimiento
        } else if (preguntaLower.contains("muchas gracias por la ayuda")) {
            return "¡De nada! Estoy aquí para ayudarte. ¿Tienes alguna otra consulta?";
        } else if (preguntaLower.contains("te agradezco mucho por la información")) {
            return "¡Con gusto! Si tienes más preguntas, no dudes en preguntar. ¡Estoy aquí para ayudarte!";
        } else if (preguntaLower.contains("gracias por tu tiempo y apoyo")) {
            return "¡Con mucho gusto! Siempre estaremos aquí para ayudarte. Si necesitas algo más, avísame.";

        }

        return "Lo siento, no tengo esa información por ahora. ¿Podrías escribirlo de otra forma o consultarlo con un especialista?";
    }

}
