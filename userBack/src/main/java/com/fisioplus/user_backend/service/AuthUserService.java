// --- AuthUserService.java ---
package com.fisioplus.user_backend.service;

import com.fisioplus.user_backend.dto.RegistroRequestDTO;
import com.fisioplus.user_backend.dto.UsuarioDTO;
import com.fisioplus.user_backend.entity.AuthUser;

import java.util.Optional;

public interface AuthUserService {
    AuthUser registrarUsuario(RegistroRequestDTO registroRequestDTO);

    Optional<AuthUser> encontrarPorUsername(String username);

    Optional<AuthUser> encontrarPorEmail(String email);

    Optional<UsuarioDTO> obtenerPerfilUsuario(String username);

    AuthUser registrarUsuarioDesdeGoogle(RegistroRequestDTO dto);
}
