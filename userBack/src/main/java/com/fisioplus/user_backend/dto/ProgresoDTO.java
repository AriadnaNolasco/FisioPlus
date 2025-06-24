package com.fisioplus.user_backend.dto;

import jakarta.validation.constraints.*;
import lombok.*;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProgresoDTO {
    private Long id;

    @NotNull
    private Long pacienteId;

    @NotNull
    private LocalDate fecha;

    @NotBlank
    private String descripcion;

    @Min(0)
    @Max(100)
    private double avancePorcentaje;
}
