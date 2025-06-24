package com.fisioplus.user_backend.controller;

import com.fisioplus.user_backend.dto.ProgresoDTO;
import com.fisioplus.user_backend.service.ProgresoService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/progreso")
@AllArgsConstructor
public class ProgresoController {
    private final ProgresoService progresoService;

    @GetMapping("/paciente/{id}")
    public List<ProgresoDTO> listarPorPaciente(@PathVariable Long id) {
        return progresoService.listarPorPaciente(id);
    }

    @PostMapping
    public ResponseEntity<ProgresoDTO> guardar(@Valid @RequestBody ProgresoDTO dto) {
        return ResponseEntity.ok(progresoService.guardar(dto));
    }
}
