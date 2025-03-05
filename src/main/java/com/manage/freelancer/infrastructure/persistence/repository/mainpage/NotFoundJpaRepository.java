package com.manage.freelancer.infrastructure.persistence.repository.mainpage;

import org.springframework.data.jpa.repository.JpaRepository;

import com.manage.freelancer.infrastructure.persistence.entity.mainpage.NotFoundEntity;

public interface NotFoundJpaRepository extends JpaRepository<NotFoundEntity,Long>{

    
} 
