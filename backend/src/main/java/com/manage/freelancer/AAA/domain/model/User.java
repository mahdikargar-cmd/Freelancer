package com.manage.freelancer.AAA.domain.model;


import com.manage.freelancer.domain.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class User {
    private Long id;
    private String email;
    private String password;
    private Role role;
    private Double rating ; // امتیاز کاربر (مثلاً 0 تا 5)
    private Integer ratingCount; // تعداد امتیازهای داده‌شده
    private String phone;
    private LocalDateTime createdAt; // زمان ثبت‌نام

}
