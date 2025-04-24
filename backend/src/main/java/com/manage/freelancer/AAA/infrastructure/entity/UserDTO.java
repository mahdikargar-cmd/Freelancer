package com.manage.freelancer.AAA.infrastructure.entity;

import com.manage.freelancer.domain.entity.Role;
import jakarta.persistence.*;
import jakarta.validation.constraints.Pattern;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserDTO {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String email;

    private String password;

    @Enumerated(EnumType.STRING)
    private Role role; // نقش کاربر: فریلنسر یا کارفرما

    private Double rating; // امتیاز کاربر (مثلاً 0 تا 5)

    private Integer ratingCount; // تعداد امتیازهای داده‌شده

    @Pattern(regexp = "^\\+?[1-9]\\d{1,14}$", message = "شماره تلفن باید معتبر باشد")
    private int phone;
    private LocalDateTime createdAt; // زمان ثبت‌نام

    @PrePersist
    protected void onCreate() {
        if (createdAt == null) {
            createdAt = LocalDateTime.now();
        }
    }


}