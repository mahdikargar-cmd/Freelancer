package com.manage.freelancer.infrastructure.persistence.entityDTO;

import com.manage.freelancer.AAA.infrastructure.entity.UserDTO;
import com.manage.freelancer.domain.entity.PaymentStatus;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
@Table(name = "payments")
public class PaymentDTo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "پرداخت‌کننده نمی‌تواند خالی باشد")
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "payer_id", nullable = false)
    private UserDTO payer;

    @NotNull(message = "دریافت‌کننده نمی‌تواند خالی باشد")
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "receiver_id", nullable = false)
    private UserDTO receiver;

    @NotNull(message = "پروژه نمی‌تواند خالی باشد")
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "project_id", nullable = false)
    private ProjectDTO project;

    @NotNull(message = "مبلغ نمی‌تواند خالی باشد")
    @Positive(message = "مبلغ باید مثبت باشد")
    @Column(nullable = false)
    private Long amount;

    @NotNull(message = "روش پرداخت نمی‌تواند خالی باشد")
    @Size(min = 1, max = 50, message = "روش پرداخت باید بین 1 تا 50 کاراکتر باشد")
    @Column(nullable = false)
    private String method;

    @NotNull(message = "وضعیت پرداخت نمی‌تواند خالی باشد")
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PaymentStatus status;

    @NotNull(message = "کد رهگیری نمی‌تواند خالی باشد")
    @Column(nullable = false, unique = true)
    private String refCode;

    private String description;

    private LocalDateTime paidAt;

    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        if (createdAt == null) {
            createdAt = LocalDateTime.now();
        }
        if (refCode == null) {
            refCode = UUID.randomUUID().toString(); // تولید کد رهگیری منحصربه‌فرد
        }
    }
}