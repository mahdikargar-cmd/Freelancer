package com.manage.freelancer;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories(basePackages = "com.manage.freelancer.infrastructure.persistence.repository")
public class FreelancerApplication {
    public static void main(String[] args) {
        SpringApplication.run(FreelancerApplication.class, args);
    }
}