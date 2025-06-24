package com.fisioplus.user_backend.dto;

import com.fisioplus.user_backend.model.enums.EstadoCita;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CitaDTO {

    @NotNull
    private Long pacienteId;

    @NotNull
    @Future
    private LocalDateTime fechaHora;

    @NotBlank
    private String motivo;

    private EstadoCita estado; // puede ser nulo, asumimos RESERVADA como default
}
