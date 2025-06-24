package com.fisioplus.user_backend.service.impl;

import com.fisioplus.user_backend.dto.CitaDTO;
import com.fisioplus.user_backend.entity.AuthUser;
import com.fisioplus.user_backend.entity.Cita;
import com.fisioplus.user_backend.model.enums.EstadoCita;
import com.fisioplus.user_backend.repository.AuthUserRepository;
import com.fisioplus.user_backend.repository.CitaRepository;
import com.fisioplus.user_backend.service.CitaService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class CitaServiceImpl implements CitaService {

    private final CitaRepository citaRepository;
    private final AuthUserRepository userRepository;

    @Override
    public List<Cita> listarPorPaciente(Long pacienteId) {
        return citaRepository.findByPacienteId(pacienteId);
    }

    @Override
    public Cita registrarCita(CitaDTO dto) {
        AuthUser paciente = userRepository.findById(Math.toIntExact(dto.getPacienteId()))
                .orElseThrow(() -> new RuntimeException("Paciente no encontrado"));

        Cita cita = new Cita();
        cita.setPaciente(paciente);
        cita.setFechaHora(dto.getFechaHora());
        cita.setMotivo(dto.getMotivo());
        cita.setEstado(dto.getEstado() != null ? dto.getEstado() : EstadoCita.RESERVADA);

        return citaRepository.save(cita);
    }
}
