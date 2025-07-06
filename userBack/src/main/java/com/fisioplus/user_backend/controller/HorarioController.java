package com.fisioplus.user_backend.controller;
import com.fisioplus.user_backend.dto.HorarioDTO;
import com.fisioplus.user_backend.service.HorarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/horarios")
public class HorarioController {
    @Autowired
    private HorarioService horarioService;

    @GetMapping("/terapeuta/{id}")
    public List<HorarioDTO> getHorarios(@PathVariable Long id) {
        return horarioService.obtenerHorariosPorTerapeuta(String.valueOf(id));
    }
}
