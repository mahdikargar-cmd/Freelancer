package com.manage.freelancer.infrastructure.persistence.jparepository.mainpage;

import com.manage.freelancer.infrastructure.persistence.entityDTO.mainpage.HeaderLinkEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HeaderLinkJpaRepository extends JpaRepository<HeaderLinkEntity,Long> {

}
