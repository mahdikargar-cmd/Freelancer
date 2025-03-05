package com.manage.freelancer.AAA.application.usecase;

import com.manage.freelancer.AAA.domain.model.User;
import com.manage.freelancer.AAA.domain.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class RegisterUserUseCase {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;  // این از Spring Security است

    public RegisterUserUseCase(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public void register(String name, String password) {
        if (userRepository.findByName(name).isPresent()) {
            throw new RuntimeException("Username already exists");
        }

        String hashedPassword = passwordEncoder.encode(password);
        User user = new User(null, name, hashedPassword);
        userRepository.save(user);
    }
}
