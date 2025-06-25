package com.fisioplus.user_backend.service.impl;

import com.fisioplus.user_backend.dto.RegistroRequestDTO;
import com.fisioplus.user_backend.dto.UsuarioDTO;
import com.fisioplus.user_backend.entity.AuthUser;
import com.fisioplus.user_backend.repository.AuthUserRepository;
import com.fisioplus.user_backend.service.AuthUserService;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;

@Service
public class AuthUserServiceImpl implements AuthUserService, UserDetailsService {

    private final AuthUserRepository authUserRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthUserServiceImpl(AuthUserRepository authUserRepository, PasswordEncoder passwordEncoder) {
        this.authUserRepository = authUserRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    @Transactional
    public AuthUser registrarUsuario(RegistroRequestDTO registroRequestDTO) {
        if (authUserRepository.existsByUsername(registroRequestDTO.getUsername())) {
            throw new RuntimeException("Error: El nombre de usuario ya está en uso!");
        }

        if (authUserRepository.existsByEmail(registroRequestDTO.getEmail())) {
            throw new RuntimeException("Error: El email ya está en uso!");
        }

        AuthUser nuevoUsuario = new AuthUser();
        nuevoUsuario.setUsername(registroRequestDTO.getUsername());
        nuevoUsuario.setEmail(registroRequestDTO.getEmail());
        nuevoUsuario.setPassword(passwordEncoder.encode(registroRequestDTO.getPassword()));
        nuevoUsuario.setFirstName(registroRequestDTO.getFirstName());
        nuevoUsuario.setLastName(registroRequestDTO.getLastName());

        // Campos obligatorios no incluidos en el DTO
        nuevoUsuario.setActive(true);
        nuevoUsuario.setStaff(false);
        nuevoUsuario.setSuperuser(false);
        nuevoUsuario.setDateJoined(LocalDateTime.now());
        nuevoUsuario.setLastLogin(null);

        return authUserRepository.save(nuevoUsuario);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<AuthUser> encontrarPorUsername(String username) {
        return authUserRepository.findByUsername(username);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<AuthUser> encontrarPorEmail(String email) {
        return authUserRepository.findByEmail(email);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<UsuarioDTO> obtenerPerfilUsuario(String username) {
        return authUserRepository.findByUsername(username)
                .map(this::convertirAUsuarioDTO);
    }

    // --- Implementación de UserDetailsService ---
    @Override
    @Transactional(readOnly = true)
    public UserDetails loadUserByUsername(String usernameOrEmail) throws UsernameNotFoundException {
        AuthUser authUser = authUserRepository.findByUsername(usernameOrEmail)
                .orElseGet(() -> authUserRepository.findByEmail(usernameOrEmail)
                        .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado con username o email: " + usernameOrEmail)));

        Set<GrantedAuthority> authorities = new HashSet<>();
        if (authUser.isSuperuser()) {
            authorities.add(new SimpleGrantedAuthority("ROLE_SUPERUSER"));
        }
        if (authUser.isStaff()) {
            authorities.add(new SimpleGrantedAuthority("ROLE_STAFF"));
        }

        // Rol por defecto para todos los usuarios
        authorities.add(new SimpleGrantedAuthority("ROLE_USER"));

        return new User(
                authUser.getUsername(),
                authUser.getPassword(),
                authUser.isActive(),
                true,
                true,
                true,
                authorities
        );
    }

    // --- Helper DTO Mapper ---
    private UsuarioDTO convertirAUsuarioDTO(AuthUser authUser) {
        if (authUser == null) return null;
        return new UsuarioDTO(
                authUser.getId(),
                authUser.getUsername(),
                authUser.getFirstName(),
                authUser.getLastName(),
                authUser.getEmail(),
                authUser.getDateJoined(),
                authUser.getLastLogin()
        );
    }
}
