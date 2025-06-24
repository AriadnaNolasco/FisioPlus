package com.fisioplus.user_backend.service;

import com.fisioplus.user_backend.dto.ProgresoDTO;

import java.util.List;

public interface ProgresoService {
    List<ProgresoDTO> listarPorPaciente(Integer pacienteId);
    ProgresoDTO guardar(ProgresoDTO dto);
}
