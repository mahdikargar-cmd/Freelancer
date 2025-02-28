package com.manage.freelancer;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // غیرفعال کردن CSRF
                .authorizeHttpRequests(auth -> auth
                                .requestMatchers("/api/footer/**").permitAll()
                                .requestMatchers("/api/**").permitAll() // آزاد کردن مسیر API فوتر
// آزاد کردن مسیر API فوتر
                                .anyRequest().permitAll() // غیرفعال کردن امنیت برای همه APIها
                )
                .formLogin(form -> form.disable()) // غیرفعال کردن فرم لاگین
                .httpBasic(basic -> basic.disable()); // غیرفعال کردن احراز هویت Basic

        return http.build();
    }
}
