package com.manage.freelancer.AAA.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@Configuration
@EnableJpaRepositories(basePackages = "com.manage.freelancer.AAA.infrastructure.repository")
@EntityScan(basePackages = "com.manage.freelancer.AAA.domain.model")
public class RepositoryConfig {
}