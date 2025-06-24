package com.fisioplus.user_backend.service.impl;

import com.fisioplus.user_backend.dto.EjercicioDTO;
import com.fisioplus.user_backend.entity.Ejercicio;
import com.fisioplus.user_backend.repository.EjercicioRepository;
import com.fisioplus.user_backend.service.EjercicioService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class EjercicioServiceImpl implements EjercicioService {

    private final EjercicioRepository repository;

    private EjercicioDTO mapToDTO(Ejercicio e) {
        return new EjercicioDTO(e.getId(), e.getNombre(), e.getDescripcion(), e.getVideoUrl(), e.getRepeticiones());
    }

    private Ejercicio mapToEntity(EjercicioDTO dto) {
        return new Ejercicio(dto.getId(), dto.getNombre(), dto.getDescripcion(), dto.getVideoUrl(), dto.getRepeticiones());
    }

    @Override
    public List<EjercicioDTO> listar() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    public EjercicioDTO obtenerPorId(Long id) {
        Ejercicio ejercicio = repository.findById(id).orElse(null);
        return (ejercicio != null) ? mapToDTO(ejercicio) : null;
    }

    @Override
    public EjercicioDTO guardar(EjercicioDTO dto) {
        Ejercicio guardado = repository.save(mapToEntity(dto));
        return mapToDTO(guardado);
    }

    @Override
    public void eliminar(Long id) {
        repository.deleteById(id);
    }
}
