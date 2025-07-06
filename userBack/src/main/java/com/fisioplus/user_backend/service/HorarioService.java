package com.fisioplus.user_backend.service;

import com.fisioplus.user_backend.dto.HorarioDTO;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

public interface HorarioService {
    List<HorarioDTO> obtenerHorariosPorTerapeuta(@PathVariable String username);
}
