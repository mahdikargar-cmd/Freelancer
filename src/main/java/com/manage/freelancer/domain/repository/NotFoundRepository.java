package com.manage.freelancer.domain.repository;

import java.util.List;

import com.manage.freelancer.domain.entity.NotFound;

public interface NotFoundRepository {
    List<NotFound> findAll();

    NotFound save(NotFound notfound);


    
} 
