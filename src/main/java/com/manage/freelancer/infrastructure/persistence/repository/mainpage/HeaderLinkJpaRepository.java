package com.manage.freelancer.infrastructure.persistence.repository.mainpage;

import com.manage.freelancer.infrastructure.persistence.entity.mainpage.HeaderLinkEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HeaderLinkJpaRepository extends JpaRepository<HeaderLinkEntity,Long> {

}
