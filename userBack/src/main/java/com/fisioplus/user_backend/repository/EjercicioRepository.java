package com.fisioplus.user_backend.repository;

import com.fisioplus.user_backend.entity.Ejercicio;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EjercicioRepository extends JpaRepository<Ejercicio, Long> {
}
