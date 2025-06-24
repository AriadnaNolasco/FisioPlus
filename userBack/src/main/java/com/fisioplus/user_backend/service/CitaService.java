package com.fisioplus.user_backend.service;

import com.fisioplus.user_backend.dto.CitaDTO;
import com.fisioplus.user_backend.entity.Cita;

import java.util.List;

public interface CitaService {
    List<Cita> listarPorPaciente(Long pacienteId);
    Cita registrarCita(CitaDTO dto);
}
