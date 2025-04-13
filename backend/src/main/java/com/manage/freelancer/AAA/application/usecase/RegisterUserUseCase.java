    package com.manage.freelancer.AAA.application.usecase;

    import com.manage.freelancer.AAA.config.JwtService;
    import com.manage.freelancer.AAA.infrastructure.entity.UserDTO;
    import com.manage.freelancer.AAA.infrastructure.repository.UserRepository;
    import com.manage.freelancer.domain.entity.Role;
    import org.springframework.security.crypto.password.PasswordEncoder;
    import org.springframework.stereotype.Service;

    @Service
    public class RegisterUserUseCase {
        private final UserRepository userRepository;
        private final PasswordEncoder passwordEncoder;
        private final JwtService jwtService;

        public RegisterUserUseCase(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtService jwtService) {
            this.userRepository = userRepository;
            this.passwordEncoder = passwordEncoder;
            this.jwtService = jwtService;
        }

        // Fixed method to provide a default role if not specified
        public String register(String email, String password) {
            return register(email, password, Role.FREELANCER); // Default role as freelancer
        }

        public String register(String email, String password, Role role) {
            if (userRepository.findByEmail(email).isPresent()) {
                throw new RuntimeException("Username already exists");
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