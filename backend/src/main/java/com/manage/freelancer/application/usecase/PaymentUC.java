package com.manage.freelancer.application.usecase;

import com.manage.freelancer.infrastructure.persistence.entityDTO.PaymentDTo;

import java.util.List;
import java.util.Optional;

public interface PaymentUC {
    List<PaymentDTo> getAllPayment();
    Optional<PaymentDTo> getPaymentById(Long id);
    PaymentDTo save(PaymentDTo paymentDTo);
    void delete(PaymentDTo paymentDTo);
    boolean isProjectPaid(Long projectId);
}