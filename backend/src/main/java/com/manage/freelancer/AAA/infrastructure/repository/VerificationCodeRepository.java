package com.manage.freelancer.AAA.infrastructure.repository;

import com.manage.freelancer.AAA.infrastructure.entity.VerificationCode;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface VerificationCodeRepository extends JpaRepository<VerificationCode, Long> {
    Optional<VerificationCode> findByEmailAndCode(String email, String code);

    void deleteByEmail(String email);
}
