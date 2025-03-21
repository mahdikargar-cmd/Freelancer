package com.manage.freelancer.AAA.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class SecurityConfiguration {
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}