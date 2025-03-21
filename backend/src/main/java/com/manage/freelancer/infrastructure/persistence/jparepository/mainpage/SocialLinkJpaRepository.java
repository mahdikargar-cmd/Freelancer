package com.manage.freelancer.infrastructure.persistence.jparepository.mainpage;

import com.manage.freelancer.infrastructure.persistence.entityDTO.mainpage.SocialLinkEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SocialLinkJpaRepository extends JpaRepository<SocialLinkEntity, Long> {
}