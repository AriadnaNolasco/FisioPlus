// --- AuthController.java ---
package com.fisioplus.user_backend.controller;

import com.fisioplus.user_backend.dto.AuthResponseDTO;
import com.fisioplus.user_backend.dto.LoginRequestDTO;
import com.fisioplus.user_backend.dto.RegistroRequestDTO;
import com.fisioplus.user_backend.dto.UsuarioDTO;
import com.fisioplus.user_backend.entity.AuthUser;
import com.fisioplus.user_backend.security.JwtTokenProvider;
import com.fisioplus.user_backend.service.AuthUserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final AuthUserService authUserService;
    private final JwtTokenProvider tokenProvider;

    public AuthController(AuthenticationManager authenticationManager,
                          AuthUserService authUserService,
                          JwtTokenProvider tokenProvider) {
        this.authenticationManager = authenticationManager;
        this.authUserService = authUserService;
        this.tokenProvider = tokenProvider;
    }

    @PostMapping("/registro")
    public ResponseEntity<?> registrarUsuario(@RequestBody RegistroRequestDTO registroRequestDTO) {
        try {
            authUserService.registrarUsuario(registroRequestDTO);
            return ResponseEntity.ok("¡Usuario registrado exitosamente!");
        } catch (RuntimeException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> autenticarUsuario(@RequestBody LoginRequestDTO loginRequestDTO) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequestDTO.getUsernameOrEmail(),
                            loginRequestDTO.getPassword()
                    )
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwt = tokenProvider.generateToken(authentication);

            AuthUser authUser = authUserService.encontrarPorUsername(authentication.getName())
                    .orElseThrow(() -> new RuntimeException("Error al obtener detalles del usuario después del login"));

            return ResponseEntity.ok(new AuthResponseDTO(jwt, authUser.getId(), authUser.getUsername(), authUser.getEmail()));

        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Error de autenticación: Credenciales inválidas.");
        }
    }

    @PostMapping("/google")
    public ResponseEntity<?> loginConGoogle(@RequestBody RegistroRequestDTO googleUserDTO) {
        try {
            Optional<AuthUser> existente = authUserService.encontrarPorEmail(googleUserDTO.getEmail());

            AuthUser user;
            if (existente.isPresent()) {
                user = existente.get();
            } else {
                user = authUserService.registrarUsuarioDesdeGoogle(googleUserDTO);
            }

            String jwt = tokenProvider.generateTokenDesdeEmail(user.getEmail());
            return ResponseEntity.ok(new AuthResponseDTO(jwt, user.getId(), user.getUsername(), user.getEmail()));

        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Error con login de Google.");
        }
    }

    @GetMapping("/perfil")
    public ResponseEntity<UsuarioDTO> obtenerPerfilUsuarioActual() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated() || "anonymousUser".equals(authentication.getPrincipal().toString())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String currentUsername = authentication.getName();

        return authUserService.obtenerPerfilUsuario(currentUsername)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}