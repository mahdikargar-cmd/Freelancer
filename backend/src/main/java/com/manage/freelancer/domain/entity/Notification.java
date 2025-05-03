package com.manage.freelancer.domain.entity;

import com.manage.freelancer.AAA.domain.model.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Notification {

    private Long id;
    private Long userId;
    private String type;
    private String title;
    private String message;
    private String time;
    private Boolean read;
    private String action;
    private Map<String, Object> data;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}