package com.fisioplus.user_backend.service.impl;

import com.fisioplus.user_backend.dto.CitaDTO;
import com.fisioplus.user_backend.entity.AuthUser;
import com.fisioplus.user_backend.entity.Cita;
import com.fisioplus.user_backend.model.enums.EstadoCita;
import com.fisioplus.user_backend.repository.AuthUserRepository;
import com.fisioplus.user_backend.repository.CitaRepository;
import com.fisioplus.user_backend.service.CitaService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

@Service
@AllArgsConstructor
public class CitaServiceImpl implements CitaService {

    private final CitaRepository citaRepository;
    private final AuthUserRepository userRepository;

    @Override
    public Page<Cita> listarPorPaciente(Long pacienteId, Pageable pageable) {
        return citaRepository.findByPacienteId(pacienteId, pageable);
    }

    @Override
    public Cita registrarCita(CitaDTO dto) {
        if (dto.getFechaHora().toLocalDate().isEqual(LocalDate.now())) {
            throw new RuntimeException("No se permiten citas el mismo día.");
        }

        // ✅ Validar si ese profesional ya tiene cita en esa hora
        if (citaRepository.existsByProfesionalAndFechaHora(dto.getProfesional(), dto.getFechaHora())) {
            throw new RuntimeException("El profesional ya tiene una cita en ese horario.");
        }

        AuthUser paciente = userRepository.findById(Math.toIntExact(dto.getPacienteId()))
                .orElseThrow(() -> new RuntimeException("Paciente no encontrado"));

        Cita cita = new Cita();
        cita.setPaciente(paciente);
        cita.setFechaHora(dto.getFechaHora());
        cita.setMotivo(dto.getMotivo());
        cita.setProfesional(dto.getProfesional());
        cita.setEstado(dto.getEstado() != null ? dto.getEstado() : EstadoCita.RESERVADA);

        return citaRepository.save(cita);
    }

    @Override
    public void cancelarCita(Long citaId) {
        Cita cita = citaRepository.findById(citaId)
                .orElseThrow(() -> new RuntimeException("Cita no encontrada"));

        if (ChronoUnit.HOURS.between(LocalDateTime.now(), cita.getFechaHora()) < 24) {
            throw new RuntimeException("Solo puedes cancelar con 24h de anticipación.");
        }

        cita.setEstado(EstadoCita.CANCELADA);
        citaRepository.save(cita);
    }

    @Override
    public void editarCita(Long citaId, CitaDTO dto) {
        Cita cita = citaRepository.findById(citaId)
                .orElseThrow(() -> new RuntimeException("Cita no encontrada"));

        if (ChronoUnit.HOURS.between(LocalDateTime.now(), cita.getFechaHora()) < 24) {
            throw new RuntimeException("Solo puedes editar con 24h de anticipación.");
        }

        cita.setMotivo(dto.getMotivo());
        cita.setFechaHora(dto.getFechaHora());
        cita.setProfesional(dto.getProfesional());

        citaRepository.save(cita);
    }
}
