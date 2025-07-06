package com.fisioplus.user_backend.repository;

import com.fisioplus.user_backend.entity.AuthUser;
import com.fisioplus.user_backend.entity.Cita;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;

public interface CitaRepository extends JpaRepository<Cita, Long> {

    Page<Cita> findByPacienteId(Long pacienteId, Pageable pageable);

    boolean existsByTerapeutaAndFechaHora(AuthUser terapeuta, LocalDateTime fechaHora);

    boolean existsByTerapeutaAndFechaHoraAndIdNot(AuthUser terapeuta, LocalDateTime fechaHora, Long id);

}
