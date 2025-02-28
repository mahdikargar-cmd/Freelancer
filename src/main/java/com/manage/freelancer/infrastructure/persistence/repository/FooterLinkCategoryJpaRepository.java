package com.manage.freelancer.infrastructure.persistence.repository;

import com.manage.freelancer.infrastructure.persistence.entity.FooterLinkCategoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface FooterLinkCategoryJpaRepository extends JpaRepository<FooterLinkCategoryEntity, Long> {
    @Query("SELECT c FROM FooterLinkCategoryEntity c LEFT JOIN FETCH c.links")
    List<FooterLinkCategoryEntity> findAllWithLinks();
}
