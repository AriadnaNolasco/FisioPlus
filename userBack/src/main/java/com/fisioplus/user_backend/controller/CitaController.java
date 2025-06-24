package com.fisioplus.user_backend.controller;

import com.fisioplus.user_backend.dto.CitaDTO;
import com.fisioplus.user_backend.entity.Cita;
import com.fisioplus.user_backend.service.CitaService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/citas")
@AllArgsConstructor
public class CitaController {

    private final CitaService citaService;

    @GetMapping("/paciente/{id}")
    public List<Cita> listarPorPaciente(@PathVariable Long id) {
        return citaService.listarPorPaciente(id);
    }

    @PostMapping
    public Cita crearCita(@Valid @RequestBody CitaDTO citaDTO) {
        return citaService.registrarCita(citaDTO);
    }
}
