package com.manage.freelancer.infrastructure.persistence.mapper;

import com.manage.freelancer.domain.entity.Notification;
import com.manage.freelancer.infrastructure.persistence.entityDTO.NotificationDTO;
import org.springframework.stereotype.Component;

@Component
public class NotificationMapper {

    public Notification toDomain(NotificationDTO notificationDTO) {
        if (notificationDTO == null) {
            return null;
        }
        return Notification.builder()
                .id(notificationDTO.getId())
                .userId(notificationDTO.getUserId())
                .type(notificationDTO.getType())
                .title(notificationDTO.getTitle())
                .message(notificationDTO.getMessage())
                .time(notificationDTO.getTime())
                .read(notificationDTO.getRead())
                .action(notificationDTO.getAction())
                .data(notificationDTO.getData())
                .createdAt(notificationDTO.getCreatedAt())
                .updatedAt(notificationDTO.getUpdatedAt())
                .build();
    }

    public NotificationDTO toDTO(Notification notification) {
        if (notification == null) {
            return null;
        }
        return NotificationDTO.builder()
                .id(notification.getId())
                .userId(notification.getUserId())
                .type(notification.getType())
                .title(notification.getTitle())
                .message(notification.getMessage())
                .time(notification.getTime())
                .read(notification.getRead())
                .action(notification.getAction())
                .data(notification.getData())
                .createdAt(notification.getCreatedAt())
                .updatedAt(notification.getUpdatedAt())
                .build();
    }
}