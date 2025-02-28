package com.manage.freelancer.infrastructure.persistence.repository;

import com.manage.freelancer.infrastructure.persistence.entity.HeaderLinkEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HeaderLinkJpaRepository extends JpaRepository<HeaderLinkEntity,Long> {

}
