package com.manage.freelancer.AAA.Interface.controller;


import com.manage.freelancer.AAA.Interface.dto.JwtResponse;
import com.manage.freelancer.AAA.application.usecase.AdminAuthService;
import com.manage.freelancer.AAA.infrastructure.entity.AdminLoginRequest;
import com.manage.freelancer.AAA.infrastructure.entity.AdminRegisterRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin/auth")
@RequiredArgsConstructor
public class AdminAuthController {

    private final AdminAuthService adminAuthService;

    @PostMapping("/login")
    public ResponseEntity<JwtResponse> login(@RequestBody AdminLoginRequest request) {
        return ResponseEntity.ok(adminAuthService.login(request));
    }
    @PostMapping("/register")
    public ResponseEntity<JwtResponse> register(@RequestBody AdminRegisterRequest request) {
        return ResponseEntity.ok(adminAuthService.register(request));
    }

}

