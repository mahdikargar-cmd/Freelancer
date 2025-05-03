package com.manage.freelancer.presentation.controller;

import com.manage.freelancer.application.usecaseimpl.PaymentUCImpl;
import com.manage.freelancer.domain.entity.PaymentStatus;
import com.manage.freelancer.infrastructure.persistence.entityDTO.PaymentDTo;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/app/payment")
public class PaymentController {
    private final PaymentUCImpl paymentUC;

    @GetMapping("/getAll")
    public ResponseEntity<List<PaymentDTo>> getAll() {
        return ResponseEntity.ok(paymentUC.getAllPayment());
    }

    @GetMapping("/byId/{id}")
    public ResponseEntity<PaymentDTo> getById(@PathVariable Long id) {
        Optional<PaymentDTo> payment = paymentUC.getPaymentById(id);
        return payment.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @GetMapping("/status/{projectId}")
    public ResponseEntity<Boolean> getPaymentStatus(@PathVariable Long projectId) {
        boolean isPaid = paymentUC.isProjectPaid(projectId);
        return ResponseEntity.ok(isPaid);
    }

    @PostMapping("/submitPayment")
    public ResponseEntity<?> submitPayment(@Valid @RequestBody PaymentDTo paymentDTo) {
        // بررسی اینکه پروژه قبلاً پرداخت نشده باشد
        if (paymentUC.isProjectPaid(paymentDTo.getProject().getId())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("این پروژه قبلاً پرداخت شده است.");
        }

        // تنظیم وضعیت پرداخت به PENDING اگر مشخص نشده باشد
        if (paymentDTo.getStatus() == null) {
            paymentDTo.setStatus(PaymentStatus.PENDING);
        }

        try {
            PaymentDTo savedPayment = paymentUC.save(paymentDTo);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedPayment);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("خطا در ثبت پرداخت: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        Optional<PaymentDTo> payment = paymentUC.getPaymentById(id);
        if (payment.isPresent()) {
            paymentUC.delete(payment.get());
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
}