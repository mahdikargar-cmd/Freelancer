package com.manage.freelancer.AAA.config;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // Implement user lookup logic
        // This is a placeholder - replace with actual user lookup from your database
        return org.springframework.security.core.userdetails.User
                .withUsername(username)
                .password("{noop}password") // Use NoOpPasswordEncoder for simplicity, NOT recommended for production
                .roles("USER")
                .build();
    }
}