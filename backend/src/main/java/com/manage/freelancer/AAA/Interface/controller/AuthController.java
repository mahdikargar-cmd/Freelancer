package com.manage.freelancer.AAA.Interface.controller;

import com.manage.freelancer.AAA.Interface.dto.AuthResponse;
import com.manage.freelancer.AAA.Interface.dto.LoginRequest;
import com.manage.freelancer.AAA.Interface.dto.RegisterRequest;
import com.manage.freelancer.AAA.application.usecase.LoginUserUseCase;
import com.manage.freelancer.AAA.application.usecase.RegisterUserUseCase;
import com.manage.freelancer.AAA.config.JwtService;
import com.manage.freelancer.AAA.infrastructure.entity.UserDTO;
import com.manage.freelancer.domain.entity.Role;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private final RegisterUserUseCase registerUserUseCase;
    private final LoginUserUseCase loginUserUseCase;
    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;


    public AuthController(RegisterUserUseCase registerUserUseCase, JwtService jwtService, UserDetailsService userDetailsService, LoginUserUseCase loginUserUseCase) {
        this.registerUserUseCase = registerUserUseCase;
        this.loginUserUseCase = loginUserUseCase;
        this.jwtService = jwtService;
        this.userDetailsService = userDetailsService;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) {
        try {
            String token = registerUserUseCase.register(request.getEmail(), request.getPassword());
            if (token != null) {
                UserDTO user = loginUserUseCase.getByEmail(request.getEmail());
                String roleStr = user.getRole() != null ? user.getRole().toString() : "UNKNOWN";
                return ResponseEntity.ok(new AuthResponse("User registered successfully", token, roleStr));
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(new AuthResponse("خطا در ثبت نام بک اند", null, null));
            }
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new AuthResponse(e.getMessage(), null, null));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        String token = loginUserUseCase.login(request.getEmail(), request.getPassword());

        if (token != null) {
            UserDTO user = loginUserUseCase.getByEmail(request.getEmail());
            // Handle null role case
            String roleStr = user.getRole() != null ? user.getRole().toString() : "UNKNOWN";
            return ResponseEntity.ok(new AuthResponse("Login successful", token, roleStr));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new AuthResponse("Invalid credentials", null, null));
        }
    }


    @GetMapping("/user/{id}")
    public ResponseEntity<?> getUserById(@PathVariable Long id) {
        try {
            UserDTO user = loginUserUseCase.getById(id);
            return ResponseEntity.ok(user);
        }
        catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
    }

    @GetMapping("/validate")
    public ResponseEntity<?> validateToken(@RequestHeader("Authorization") String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid token");
        }
        String token = authHeader.substring(7);
        String username = jwtService.extractUsername(token);
        UserDetails userDetails = userDetailsService.loadUserByUsername(username);

        if (jwtService.isTokenValid(token, userDetails)) {
            return ResponseEntity.ok("Token is valid");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token is invalid");
        }
    }
}