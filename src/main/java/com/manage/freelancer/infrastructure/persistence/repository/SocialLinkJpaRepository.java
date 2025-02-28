package com.manage.freelancer.infrastructure.persistence.repository;

import com.manage.freelancer.infrastructure.persistence.entity.SocialLinkEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SocialLinkJpaRepository extends JpaRepository<SocialLinkEntity, Long> {
}