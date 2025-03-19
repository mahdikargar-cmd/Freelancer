package com.manage.freelancer.AAA.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                        .allowedOrigins("http://localhost:7070")
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")  // Add OPTIONS
                        .allowedHeaders("*")
                        .exposedHeaders("Authorization")  // Add this line
                        .allowCredentials(true);
            }
        };
    }
}
