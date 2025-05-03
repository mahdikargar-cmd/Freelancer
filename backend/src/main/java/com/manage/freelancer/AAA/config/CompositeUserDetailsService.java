package com.manage.freelancer.AAA.config;

import com.manage.freelancer.AAA.infrastructure.repository.AdminRepo;
import com.manage.freelancer.AAA.infrastructure.repository.UserRepository;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service("compositeUserDetailsService")  // Use a different name
public class CompositeUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;
    private final AdminRepo adminRepository;

    public CompositeUserDetailsService(UserRepository userRepository, AdminRepo adminRepository) {
        this.userRepository = userRepository;
        this.adminRepository = adminRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        try {
            // First try to find a regular user
            return userRepository.findByEmail(username)
                    .map(user -> new org.springframework.security.core.userdetails.User(
                            user.getEmail(),
                            user.getPassword(),
                            Collections.singleton(new SimpleGrantedAuthority("ROLE_USER"))
                    ))
                    .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + username));
        } catch (UsernameNotFoundException e) {
            // If not found, try to find an admin
            return adminRepository.findByUsername(username)
                    .map(admin -> new org.springframework.security.core.userdetails.User(
                            admin.getUsername(),
                            admin.getPassword(),
                            Collections.singleton(new SimpleGrantedAuthority("ROLE_ADMIN"))
                    ))
                    .orElseThrow(() -> new UsernameNotFoundException("No user or admin found with username: " + username));
        }
    }
}