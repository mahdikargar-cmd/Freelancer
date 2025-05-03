package com.manage.freelancer.presentation.controller;

import com.manage.freelancer.application.usecaseimpl.NotificationUCImpl;
import com.manage.freelancer.domain.entity.Notification;
import com.manage.freelancer.domain.entity.NotificationRequest;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@AllArgsConstructor
@RequestMapping("/api/notifications")
public class NotificationController {

    private final NotificationUCImpl notificationService;

    @PostMapping
    public ResponseEntity<?> createNotification(@Valid @RequestBody NotificationRequest request) {
        try {
            Notification notification = notificationService.createNotification(
                    request.getUserId(),
                    request.getType(),
                    request.getTitle(),
                    request.getMessage(),
                    request.getAction(),
                    request.getData()
            );
            return new ResponseEntity<>(notification, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(Map.of("error", "خطا در ایجاد نوتیفیکیشن: " + e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}