package com.manage.freelancer.application.usecaseimpl;

import com.manage.freelancer.application.usecase.PaymentUC;
import com.manage.freelancer.domain.entity.PaymentStatus;
import com.manage.freelancer.infrastructure.persistence.entityDTO.PaymentDTo;
import com.manage.freelancer.infrastructure.persistence.jparepository.PaymentJPARepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PaymentUCImpl implements PaymentUC {
    private final PaymentJPARepo paymentJPARepo;

    @Override
    @Transactional(readOnly = true)
    public List<PaymentDTo> getAllPayment() {
        return paymentJPARepo.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<PaymentDTo> getPaymentById(Long id) {
        return paymentJPARepo.findById(id);
    }

    @Override
    @Transactional
    public PaymentDTo save(PaymentDTo paymentDTo) {
        return paymentJPARepo.save(paymentDTo);
    }

    @Override
    @Transactional
    public void delete(PaymentDTo paymentDTo) {
        paymentJPARepo.delete(paymentDTo);
    }

    @Override
    @Transactional(readOnly = true)
    public boolean isProjectPaid(Long projectId) {
        return paymentJPARepo.findByProjectIdAndStatus(projectId, PaymentStatus.SUCCESS).isPresent();
    }
}