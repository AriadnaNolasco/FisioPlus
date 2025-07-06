package com.fisioplus.user_backend.dto;

import java.time.LocalTime;

public class HorarioDTO {
    private Long id;
    private String diaSemana;      // "LUNES", "MARTES", etc.
    private LocalTime horaInicio;  // "09:00"
    private LocalTime horaFin;     // "11:00"
    private Long terapeuta;        // ID del terapeuta

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDiaSemana() {
        return diaSemana;
    }

    public void setDiaSemana(String diaSemana) {
        this.diaSemana = diaSemana;
    }

    public LocalTime getHoraInicio() {
        return horaInicio;
    }

    public void setHoraInicio(LocalTime horaInicio) {
        this.horaInicio = horaInicio;
    }

    public LocalTime getHoraFin() {
        return horaFin;
    }

    public void setHoraFin(LocalTime horaFin) {
        this.horaFin = horaFin;
    }

    public Long getTerapeuta() {
        return terapeuta;
    }

    public void setTerapeuta(Long terapeuta) {
        this.terapeuta = terapeuta;
    }
}


