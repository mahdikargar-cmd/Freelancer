package com.manage.freelancer.infrastructure.persistence.jparepository.mainpage;

import com.manage.freelancer.infrastructure.persistence.entityDTO.mainpage.FooterLinkEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FooterLinkJpaRepository extends JpaRepository<FooterLinkEntity, Long> {
    List<FooterLinkEntity> findByCategoryId(Long categoryId);
}
