package com.manage.freelancer.infrastructure.persistence.repository.mainpage;

import com.manage.freelancer.infrastructure.persistence.entity.mainpage.SocialLinkEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SocialLinkJpaRepository extends JpaRepository<SocialLinkEntity, Long> {
}