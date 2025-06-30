package com.fisioplus.user_backend.service;

import com.fisioplus.user_backend.dto.EjercicioDTO;

import java.util.List;

public interface EjercicioService {
    List<EjercicioDTO> listar();
    EjercicioDTO obtenerPorId(Long id);
    EjercicioDTO guardar(EjercicioDTO dto);
    void eliminar(Long id);
}
