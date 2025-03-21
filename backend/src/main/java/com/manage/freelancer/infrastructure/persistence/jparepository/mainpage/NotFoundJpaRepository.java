package com.manage.freelancer.infrastructure.persistence.jparepository.mainpage;

import org.springframework.data.jpa.repository.JpaRepository;

import com.manage.freelancer.infrastructure.persistence.entityDTO.mainpage.NotFoundEntity;

public interface NotFoundJpaRepository extends JpaRepository<NotFoundEntity,Long>{

    
} 
