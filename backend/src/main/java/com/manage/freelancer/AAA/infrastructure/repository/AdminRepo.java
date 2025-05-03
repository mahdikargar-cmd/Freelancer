package com.manage.freelancer.AAA.infrastructure.repository;

import com.manage.freelancer.AAA.domain.model.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AdminRepo extends JpaRepository<Admin, Long> {
    Optional<Admin> findByUsername(String username);
}
