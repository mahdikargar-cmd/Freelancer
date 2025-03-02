package com.manage.freelancer.infrastructure.persistence.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.manage.freelancer.infrastructure.persistence.entity.NotFoundEntity;

public interface NotFoundJpaRepository extends JpaRepository<NotFoundEntity,Long>{

    
} 
