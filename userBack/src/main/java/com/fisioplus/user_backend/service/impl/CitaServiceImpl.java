package com.fisioplus.user_backend.service.impl;

import com.fisioplus.user_backend.dto.HorarioDTO;
import com.fisioplus.user_backend.service.HorarioService;
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
import java.util.List;

@Service
@AllArgsConstructor
public class CitaServiceImpl implements CitaService {

    private final CitaRepository citaRepository;
    private final AuthUserRepository userRepository;
    private final HorarioService horarioService;

    @Override
    public Page<Cita> listarPorPaciente(Long pacienteId, Pageable pageable) {
        return citaRepository.findByPacienteId(pacienteId, pageable);
    }

    @Override
    public Cita registrarCita(CitaDTO dto) {
        if (dto.getFechaHora().toLocalDate().isEqual(LocalDate.now())) {
            throw new RuntimeException("No se permiten citas el mismo día.");
        }

        AuthUser terapeuta = userRepository.findById(Math.toIntExact(dto.getTerapeutaId()))
                .orElseThrow(() -> new RuntimeException("Terapeuta no encontrado"));

        if (citaRepository.existsByTerapeutaAndFechaHora(terapeuta, dto.getFechaHora())) {
            throw new RuntimeException("El terapeuta ya tiene una cita en ese horario.");
        }

        String nombreDia = dto.getFechaHora().getDayOfWeek().name();
        List<HorarioDTO> horarios = horarioService.obtenerHorariosPorTerapeuta(String.valueOf(terapeuta.getId()));

        boolean horarioValido = horarios.stream().anyMatch(h ->
                h.getDiaSemana().equalsIgnoreCase(nombreDia) &&
                        !dto.getFechaHora().toLocalTime().isBefore(h.getHoraInicio()) &&
                        !dto.getFechaHora().toLocalTime().isAfter(h.getHoraFin())
        );

        if (!horarioValido) {
            throw new RuntimeException("El terapeuta no atiende en ese día u horario.");
        }

        // Crear cita
        AuthUser paciente = userRepository.findById(Math.toIntExact(dto.getPacienteId()))
                .orElseThrow(() -> new RuntimeException("Paciente no encontrado"));

        Cita cita = new Cita();
        cita.setPaciente(paciente);
        cita.setFechaHora(dto.getFechaHora());
        cita.setMotivo(dto.getMotivo());
        cita.setTerapeuta(terapeuta);
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

        AuthUser terapeuta = userRepository.findById(Math.toIntExact(dto.getTerapeutaId()))
                .orElseThrow(() -> new RuntimeException("Terapeuta no encontrado"));

        String nombreDia = dto.getFechaHora().getDayOfWeek().name();
        List<HorarioDTO> horarios = horarioService.obtenerHorariosPorTerapeuta(String.valueOf(terapeuta.getId()));

        boolean horarioValido = horarios.stream().anyMatch(h ->
                h.getDiaSemana().equalsIgnoreCase(nombreDia) &&
                        !dto.getFechaHora().toLocalTime().isBefore(h.getHoraInicio()) &&
                        !dto.getFechaHora().toLocalTime().isAfter(h.getHoraFin())
        );

        if (!horarioValido) {
            throw new RuntimeException("El terapeuta no atiende en ese día u horario.");
        }

        // ✅ Validar que no haya otra cita con ese profesional en ese horario (distinta de la actual)
        boolean citaYaExiste = citaRepository.existsByTerapeutaAndFechaHoraAndIdNot(
                terapeuta, dto.getFechaHora(), citaId
        );
        if (citaYaExiste) {
            throw new RuntimeException("Ese horario ya está ocupado por otra cita.");
        }

        // Actualizar datos
        cita.setMotivo(dto.getMotivo());
        cita.setFechaHora(dto.getFechaHora());
        cita.setTerapeuta(terapeuta);

        citaRepository.save(cita);
    }
}
