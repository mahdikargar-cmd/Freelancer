package com.manage.freelancer.AAA.application.usecase;

import com.manage.freelancer.AAA.config.JwtService;
import com.manage.freelancer.AAA.infrastructure.entity.UserDTO;
import com.manage.freelancer.AAA.infrastructure.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@AllArgsConstructor
public class PasswordResetUseCase {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;
    private final JwtService jwtService;

    @Transactional
    public void initiatePasswordReset(String email) throws Exception {
        System.out.println("🔍 Initiating password reset for email: " + email);
        if (!userRepository.findByEmail(email).isPresent()) {
            throw new RuntimeException("ایمیل یافت نشد");
        }
        emailService.sendPasswordResetEmail(email);
    }

    @Transactional
    public String completePasswordReset(String email, String newPassword, String code) {
        System.out.println("🔍 Starting completePasswordReset for email: " + email + ", code: " + code);
        if (!emailService.verifyCode(email, code)) {
            System.err.println("🔍 Verification failed for email: " + email + ", code: " + code);
            throw new RuntimeException("کد تأیید نامعتبر است یا منقضی شده است");
        }
        System.out.println("🔍 Code verified successfully for email: " + email);

        UserDTO user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("ایمیل یافت نشد"));
        String hashedPassword = passwordEncoder.encode(newPassword);
        user.setPassword(hashedPassword);
        userRepository.save(user);
        System.out.println("🔍 Password updated for email: " + email);

        CustomUserDetails userDetails = new CustomUserDetails(user);
        String token = jwtService.generateToken(userDetails);
        System.out.println("🔍 Token generated for email: " + email);
        return token;
    }
}