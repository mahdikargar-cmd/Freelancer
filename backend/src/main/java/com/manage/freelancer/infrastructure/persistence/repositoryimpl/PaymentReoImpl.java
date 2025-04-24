package com.manage.freelancer.infrastructure.persistence.repositoryimpl;

import com.manage.freelancer.infrastructure.persistence.entityDTO.PaymentDTo;
import com.manage.freelancer.infrastructure.persistence.jparepository.PaymentJPARepo;
import com.manage.freelancer.infrastructure.persistence.repository.PaymentRepo;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
@AllArgsConstructor
public class PaymentReoImpl implements PaymentRepo {
    private final PaymentJPARepo paymentJPARepo;

    @Override
    public List<PaymentDTo> findAll() {
        return paymentJPARepo.findAll();
    }

    @Override
    public Optional<PaymentDTo> findById(Long id) {
        return paymentJPARepo.findById(id);
    }

    @Override
    public PaymentDTo save(PaymentDTo paymentDTo) {
        return paymentJPARepo.save(paymentDTo);
    }

    @Override
    public void delete(PaymentDTo paymentDTo) {
        paymentJPARepo.delete(paymentDTo);
    }
}
