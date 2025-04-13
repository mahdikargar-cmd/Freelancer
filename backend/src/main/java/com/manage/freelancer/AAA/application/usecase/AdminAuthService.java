package com.manage.freelancer.AAA.application.usecase;


import com.manage.freelancer.AAA.Interface.dto.JwtResponse;
import com.manage.freelancer.AAA.config.JwtService;
import com.manage.freelancer.AAA.domain.model.Admin;
import com.manage.freelancer.AAA.infrastructure.entity.AdminLoginRequest;
import com.manage.freelancer.AAA.infrastructure.entity.AdminRegisterRequest;
import com.manage.freelancer.AAA.infrastructure.repository.AdminRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AdminAuthService {

    private final AdminRepo adminRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;

    public JwtResponse login(AdminLoginRequest request) {
        Admin admin = adminRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("ادمین پیدا نشد"));

        if (!passwordEncoder.matches(request.getPassword(), admin.getPassword())) {
            throw new RuntimeException("رمز اشتباهه");
        }

        String token = jwtService.generateToken(admin);
        return new JwtResponse(token, "ورود موفق");
    }
    public JwtResponse register(AdminRegisterRequest request) {
        boolean exists = adminRepository.findByUsername(request.getUsername()).isPresent();
        if (exists) {
            throw new RuntimeException("این نام کاربری قبلاً ثبت شده است.");
        }

        Admin admin = Admin.builder()
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword())) // هش رمز
                .build();

        adminRepository.save(admin);

        String token = jwtService.generateToken(admin);
        return new JwtResponse(token, "ثبت‌نام موفق");
    }

}

