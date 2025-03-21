package com.manage.freelancer.infrastructure.persistence.jparepository.mainpage;

import com.manage.freelancer.infrastructure.persistence.entityDTO.mainpage.FooterLinkCategoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface FooterLinkCategoryJpaRepository extends JpaRepository<FooterLinkCategoryEntity, Long> {
    @Query("SELECT c FROM FooterLinkCategoryEntity c LEFT JOIN FETCH c.links")
    List<FooterLinkCategoryEntity> findAllWithLinks();
}
