package com.manage.freelancer.AAA.application.usecase;

import com.manage.freelancer.AAA.config.JwtService;
import com.manage.freelancer.AAA.domain.model.User;
import com.manage.freelancer.AAA.domain.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class LoginUserUseCase {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public LoginUserUseCase(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtService jwtService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public String login(String name, String password) {
        Optional<User> userOpt = userRepository.findByName(name);

        if (userOpt.isPresent() && passwordEncoder.matches(password, userOpt.get().getPassword())) {
            User user = userOpt.get();
            CustomUserDetails userDetails = new CustomUserDetails(user); // تبدیل `User` به `UserDetails`
            return jwtService.generateToken(userDetails); // تولید و بازگشت JWT
        }
        return null;
    }
}
