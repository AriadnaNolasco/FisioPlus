package com.fisioplus.user_backend.service;

import com.fisioplus.user_backend.dto.CitaDTO;
import com.fisioplus.user_backend.entity.Cita;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface CitaService {
    Page<Cita> listarPorPaciente(Long pacienteId, Pageable pageable);
    Cita registrarCita(CitaDTO citaDTO);
    void cancelarCita(Long citaId);
    void editarCita(Long citaId, CitaDTO citaDTO);
}
