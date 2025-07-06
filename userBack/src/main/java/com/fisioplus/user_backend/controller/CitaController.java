package com.fisioplus.user_backend.controller;

import com.fisioplus.user_backend.dto.CitaDTO;
import com.fisioplus.user_backend.entity.Cita;
import com.fisioplus.user_backend.service.CitaService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/citas")
@AllArgsConstructor
public class CitaController {

    private final CitaService citaService;

    @GetMapping("/paciente/{id}")
    public Page<Cita> listarPorPaciente(
            @PathVariable Long id,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size
    ) {
        return citaService.listarPorPaciente(id, PageRequest.of(page, size, Sort.by("fechaHora").descending()));
    }

    @PostMapping
    public Cita crearCita(@Valid @RequestBody CitaDTO citaDTO) {
        return citaService.registrarCita(citaDTO);
    }

    @PutMapping("/{id}")
    public void editarCita(@PathVariable Long id, @RequestBody CitaDTO dto) {
        citaService.editarCita(id, dto);
    }

    @DeleteMapping("/{id}")
    public void cancelarCita(@PathVariable Long id) {
        citaService.cancelarCita(id);
    }
}
