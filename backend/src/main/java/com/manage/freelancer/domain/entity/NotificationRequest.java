package com.manage.freelancer.domain.entity;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.Map;

@Data
public class NotificationRequest {

    @NotNull(message = "شناسه کاربر الزامی است")
    private Long userId;

    @NotBlank(message = "نوع نوتیفیکیشن الزامی است")
    private String type;

    @NotBlank(message = "عنوان نوتیفیکیشن الزامی است")
    private String title;

    @NotBlank(message = "پیام نوتیفیکیشن الزامی است")
    private String message;

    private String action;
    private Map<String, Object> data;
}