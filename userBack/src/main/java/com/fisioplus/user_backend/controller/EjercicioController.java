package com.fisioplus.user_backend.controller;

import com.fisioplus.user_backend.dto.EjercicioDTO;
import com.fisioplus.user_backend.service.EjercicioService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ejercicios")
@AllArgsConstructor
public class EjercicioController {

    private final EjercicioService ejercicioService;

    @GetMapping
    public List<EjercicioDTO> listar() {
        return ejercicioService.listar();
    }

    @GetMapping("/{id}")
    public ResponseEntity<EjercicioDTO> obtenerPorId(@PathVariable Long id) {
        EjercicioDTO dto = ejercicioService.obtenerPorId(id);
        return (dto != null) ? ResponseEntity.ok(dto) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<EjercicioDTO> guardar(@Valid @RequestBody EjercicioDTO dto) {
        return ResponseEntity.ok(ejercicioService.guardar(dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        ejercicioService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}
