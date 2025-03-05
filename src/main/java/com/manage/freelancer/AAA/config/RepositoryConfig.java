package com.manage.freelancer.AAA.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@Configuration
@EnableJpaRepositories(basePackages = "com.manage.freelancer.AAA.infrastructure.repository")
public class RepositoryConfig {
}