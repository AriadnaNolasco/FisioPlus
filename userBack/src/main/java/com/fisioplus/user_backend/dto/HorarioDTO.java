package com.fisioplus.user_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class HorarioDTO {
    private Long id;
    private String diaSemana;      // "LUNES", "MARTES", etc.
    private LocalTime horaInicio;  // "09:00"
    private LocalTime horaFin;     // "11:00"
    private Long terapeuta;        // ID del terapeuta

}


