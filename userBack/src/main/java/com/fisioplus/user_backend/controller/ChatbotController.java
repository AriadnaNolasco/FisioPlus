package com.fisioplus.user_backend.controller;

import com.fisioplus.user_backend.dto.PreguntaDTO;
import com.fisioplus.user_backend.service.chatbot.ChatbotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/chatbot")
@CrossOrigin(origins = "*") // Habilita CORS si el frontend está separado
public class ChatbotController {

    @Autowired
    private ChatbotService chatbotService;

    @PostMapping("/preguntar")
    public String procesarPregunta(@RequestBody PreguntaDTO preguntaDTO) {
        return chatbotService.procesarPregunta(preguntaDTO.getPregunta());
    }
}
