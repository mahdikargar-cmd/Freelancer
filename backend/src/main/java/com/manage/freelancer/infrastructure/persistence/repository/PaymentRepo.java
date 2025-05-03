package com.manage.freelancer.infrastructure.persistence.repository;

import com.manage.freelancer.infrastructure.persistence.entityDTO.PaymentDTo;

import java.util.List;
import java.util.Optional;

public interface PaymentRepo {
    List<PaymentDTo> findAll();
    Optional<PaymentDTo> findById(Long id);
    PaymentDTo save(PaymentDTo paymentDTo);
    void delete(PaymentDTo paymentDTo);

}
