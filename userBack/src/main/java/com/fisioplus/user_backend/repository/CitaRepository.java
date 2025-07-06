package com.fisioplus.user_backend.repository;

import com.fisioplus.user_backend.entity.Cita;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface CitaRepository extends JpaRepository<Cita, Long> {
    List<Cita> findByPacienteId(Long pacienteId);
    Page<Cita> findByPacienteId(Long pacienteId, Pageable pageable);

    // ✅ Nuevo método para validar por profesional y fecha
    boolean existsByProfesionalAndFechaHora(String profesional, LocalDateTime fechaHora);
}
