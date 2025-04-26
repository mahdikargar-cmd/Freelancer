package com.manage.freelancer.AAA.application.usecase;

import com.manage.freelancer.AAA.config.JwtService;
import com.manage.freelancer.AAA.infrastructure.entity.UserDTO;
import com.manage.freelancer.AAA.infrastructure.repository.UserRepository;
import com.manage.freelancer.domain.entity.Role;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class LoginUserUseCase {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    public String login(String email, String password) {
        Optional<UserDTO> userOpt = userRepository.findByEmail(email);

        if (userOpt.isPresent() && passwordEncoder.matches(password, userOpt.get().getPassword())) {
            UserDTO user = userOpt.get();
            // Set a default role if it's null
            if (user.getRole() == null) {
                user.setRole(Role.FREELANCER);  // Default role
                userRepository.save(user);
            }
            CustomUserDetails userDetails = new CustomUserDetails(user);
            return jwtService.generateToken(userDetails);
        }
        return null;
    }

    public UserDTO getById(Long id) {
        return userRepository.findById(id).orElseThrow(() -> new RuntimeException("User Not Found with id: " + id));
    }

    public UserDTO getByEmail(String email) {
        UserDTO user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User Not Found with email: " + email));
        // Set a default role if it's null
        if (user.getRole() == null) {
            user.setRole(Role.FREELANCER);  // Default role
            userRepository.save(user);
        }
        return user;
    }
    public List<UserDTO> getAllUsers() {
        return userRepository.findAll();
    }
}