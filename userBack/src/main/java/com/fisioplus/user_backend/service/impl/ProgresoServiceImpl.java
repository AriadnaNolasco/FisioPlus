package com.fisioplus.user_backend.service.impl;

import com.fisioplus.user_backend.dto.ProgresoDTO;
import com.fisioplus.user_backend.entity.AuthUser;
import com.fisioplus.user_backend.entity.Progreso;
import com.fisioplus.user_backend.repository.AuthUserRepository;
import com.fisioplus.user_backend.repository.ProgresoRepository;
import com.fisioplus.user_backend.service.ProgresoService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ProgresoServiceImpl implements ProgresoService {

    private final ProgresoRepository progresoRepo;
    private final AuthUserRepository userRepo;

    private ProgresoDTO mapToDTO(Progreso p) {
        return new ProgresoDTO(p.getId(), p.getPaciente().getId(), p.getFecha(), p.getDescripcion(), p.getAvancePorcentaje());
    }

    private Progreso mapToEntity(ProgresoDTO dto) {
        AuthUser paciente = userRepo.findById(dto.getPacienteId()).orElseThrow(() -> new RuntimeException("Paciente no encontrado"));

        Progreso p = new Progreso();
        p.setId(dto.getId());
        p.setPaciente(paciente);
        p.setFecha(dto.getFecha());
        p.setDescripcion(dto.getDescripcion());
        p.setAvancePorcentaje(dto.getAvancePorcentaje());

        return p;
    }

    @Override
    public List<ProgresoDTO> listarPorPaciente(Integer pacienteId) {
        return progresoRepo.findByPacienteId(pacienteId).stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public ProgresoDTO guardar(ProgresoDTO dto) {
        Progreso guardado = progresoRepo.save(mapToEntity(dto));
        return mapToDTO(guardado);
    }
}
