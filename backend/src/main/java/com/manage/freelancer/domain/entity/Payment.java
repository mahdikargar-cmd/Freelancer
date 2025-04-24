package com.manage.freelancer.domain.entity;

import com.manage.freelancer.AAA.domain.model.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Payment {
    private Long id;
    private User payer;               // کارفرما (پرداخت‌کننده)
    private User receiver;           // فریلنسر (دریافت‌کننده)
    private Project project;         // پروژه‌ای که پرداخت برای اونه
    private Long amount;             // مبلغ پرداختی به تومان یا ریال
    private String method;           // روش پرداخت (مثلاً "wallet", "zarinpal", "stripe")
    private PaymentStatus status;    // وضعیت پرداخت
    private String refCode;          // کد رهگیری (از درگاه یا دستی)
    private String description;      // توضیح پرداخت
    private LocalDateTime paidAt;    // زمان موفقیت پرداخت
    private LocalDateTime createdAt; // زمان ثبت پرداخت
}
