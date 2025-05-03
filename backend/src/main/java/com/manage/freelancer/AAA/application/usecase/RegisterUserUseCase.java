package com.manage.freelancer.AAA.application.usecase;

import com.manage.freelancer.AAA.config.JwtService;
import com.manage.freelancer.AAA.infrastructure.entity.UserDTO;
import com.manage.freelancer.AAA.infrastructure.repository.UserRepository;
import com.manage.freelancer.domain.entity.Role;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class RegisterUserUseCase {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final EmailService emailService;

    public void initiateRegistration(String email, String password, Role role) throws Exception {
        if (userRepository.findByEmail(email).isPresent()) {
            throw new RuntimeException("ایمیل قبلاً ثبت شده است");
        }

        // ارسال کد تأیید به ایمیل
        emailService.sendVerificationEmail(email);
    }

    public String completeRegistration(String email, String password, String code, Role role) {
        // بررسی کد تأیید فقط یک بار
        if (!emailService.verifyCode(email, code)) {
            throw new RuntimeException("کد تأیید نامعتبر است یا منقضی شده است");
        }

        // ثبت‌نام نهایی
        if (userRepository.findByEmail(email).isPresent()) {
            throw new RuntimeException("ایمیل قبلاً ثبت شده است");
        }

        String hashedPassword = passwordEncoder.encode(password);
        UserDTO user = UserDTO.builder()
                .email(email)
                .password(hashedPassword)
                .role(role)
                .build();
        userRepository.save(user);
        CustomUserDetails userDetails = new CustomUserDetails(user);
        return jwtService.generateToken(userDetails);
    }
}