package com.manage.freelancer.application.usecaseimpl;

import com.manage.freelancer.domain.entity.Notification;
import com.manage.freelancer.infrastructure.persistence.entityDTO.NotificationDTO;
import com.manage.freelancer.infrastructure.persistence.jparepository.NotifJPARepo;
import com.manage.freelancer.infrastructure.persistence.mapper.NotificationMapper;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.HashMap;
import java.util.Map;

@Service
@AllArgsConstructor
public class NotificationUCImpl {

    private final NotifJPARepo notificationRepository;
    private final NotificationMapper notificationMapper;

    public Notification createNotification(Long userId, String type, String title, String message, String action, Map<String, Object> data) {
        Notification notification = Notification.builder()
                .userId(userId)
                .type(type)
                .title(title)
                .message(message)
                .time(calculateTime(LocalDateTime.now()))
                .read(false)
                .action(action)
                .data(data != null ? data : new HashMap<>())
                .build();

        NotificationDTO notificationDTO = notificationMapper.toDTO(notification);
        NotificationDTO savedNotificationDTO = notificationRepository.save(notificationDTO);
        return notificationMapper.toDomain(savedNotificationDTO);
    }

    private String calculateTime(LocalDateTime createdAt) {
        LocalDateTime now = LocalDateTime.now();
        long minutes = ChronoUnit.MINUTES.between(createdAt, now);
        if (minutes < 1) {
            return "چند لحظه پیش";
        } else if (minutes < 60) {
            return minutes + " دقیقه پیش";
        } else {
            long hours = minutes / 60;
            if (hours < 24) {
                return hours + " ساعت پیش";
            } else {
                long days = hours / 24;
                return days + " روز پیش";
            }
        }
    }
}