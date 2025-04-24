package com.manage.freelancer.infrastructure.persistence.jparepository;

import com.manage.freelancer.domain.entity.PaymentStatus;
import com.manage.freelancer.infrastructure.persistence.entityDTO.PaymentDTo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PaymentJPARepo extends JpaRepository<PaymentDTo, Long> {
    Optional<PaymentDTo> findByProjectIdAndStatus(Long projectId, PaymentStatus status);
}