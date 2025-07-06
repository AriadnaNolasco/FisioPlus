package com.fisioplus.user_backend.service.impl;

import com.fisioplus.user_backend.dto.HorarioDTO;
import com.fisioplus.user_backend.service.HorarioService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.List;

@Service
public class HorarioServiceImpl implements HorarioService {
    @Value("${django.api.url}")
    private String djangoApiUrl;

    private final RestTemplate restTemplate = new RestTemplate();

    @Override
    public List<HorarioDTO> obtenerHorariosPorTerapeuta(String terapeutaId) {
        String url = djangoApiUrl + "/api/horarios/?terapeuta=" + terapeutaId;

        ResponseEntity<HorarioDTO[]> response = restTemplate.getForEntity(url, HorarioDTO[].class);
        return Arrays.asList(response.getBody());
    }
}
