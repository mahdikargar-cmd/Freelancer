package com.manage.freelancer.infrastructure.persistence.mapper;
import com.manage.freelancer.AAA.infrastructure.UserMapper;
import com.manage.freelancer.domain.entity.Payment;
import com.manage.freelancer.infrastructure.persistence.entityDTO.PaymentDTo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class PaymentMapper {
    private final UserMapper userMapper;
    private final ProjectMapper projectMapper;

    public PaymentDTo toPaymentDTo(Payment payment) {
        if (payment == null) return null;

        return PaymentDTo.builder()
                .id(payment.getId())
                .payer(userMapper.toDTO(payment.getPayer())) // تبدیل User به UserDTO
                .receiver(userMapper.toDTO(payment.getReceiver()))
                .project(projectMapper.toDTO(payment.getProject())) // تبدیل Project به ProjectDTO
                .amount(payment.getAmount())
                .method(payment.getMethod())
                .status(payment.getStatus())
                .refCode(payment.getRefCode())
                .description(payment.getDescription())
                .paidAt(payment.getPaidAt())
                .createdAt(payment.getCreatedAt())
                .build();
    }

    public Payment toPayment(PaymentDTo paymentDto) {
        if (paymentDto == null) return null;
        return Payment.builder()
                .id(paymentDto.getId())
                .payer(userMapper.toDomain(paymentDto.getPayer())) // تبدیل UserDTO به User
                .receiver(userMapper.toDomain(paymentDto.getReceiver()))
                .project(projectMapper.toDomain(paymentDto.getProject())) // تبدیل ProjectDTO به Project
                .amount(paymentDto.getAmount())
                .method(paymentDto.getMethod())
                .status(paymentDto.getStatus())
                .refCode(paymentDto.getRefCode())
                .description(paymentDto.getDescription())
                .paidAt(paymentDto.getPaidAt())
                .createdAt(paymentDto.getCreatedAt())
                .build();
    }
}