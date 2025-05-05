package com.manage.freelancer;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories(basePackages = {
        "com.manage.freelancer.infrastructure.persistence.jparepository",
        "com.manage.freelancer.AAA.infrastructure.repository"
})
@EntityScan(basePackages = {
        "com.manage.freelancer.infrastructure.persistence.entity",
        "com.manage.freelancer.AAA.infrastructure.entity",
        "com.manage.freelancer.infrastructure.persistence.entityDTO"
})
public class FreelancerApplication {
    public static void main(String[] args) {
        SpringApplication.run(FreelancerApplication.class, args);
    }
}