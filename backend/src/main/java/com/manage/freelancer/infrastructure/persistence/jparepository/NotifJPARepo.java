package com.manage.freelancer.infrastructure.persistence.jparepository;

import com.manage.freelancer.infrastructure.persistence.entityDTO.NotificationDTO;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotifJPARepo extends JpaRepository<NotificationDTO, Long> {
}