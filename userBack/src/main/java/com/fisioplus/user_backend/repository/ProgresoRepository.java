package com.fisioplus.user_backend.repository;

import com.fisioplus.user_backend.entity.Progreso;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProgresoRepository extends JpaRepository<Progreso, Integer> {
    List<Progreso> findByPacienteId(Integer pacienteId);
}
