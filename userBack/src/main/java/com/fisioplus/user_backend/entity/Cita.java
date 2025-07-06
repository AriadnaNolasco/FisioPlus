package com.fisioplus.user_backend.entity;

import com.fisioplus.user_backend.model.enums.EstadoCita;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
public class Cita {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private AuthUser paciente;

    @ManyToOne
    private AuthUser terapeuta;

    private LocalDateTime fechaHora;
    private String motivo;

    @Enumerated(EnumType.STRING)
    private EstadoCita estado;

}
