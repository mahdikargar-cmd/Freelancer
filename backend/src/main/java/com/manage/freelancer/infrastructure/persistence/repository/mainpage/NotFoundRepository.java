package com.manage.freelancer.infrastructure.persistence.repository.mainpage;

import java.util.List;

import com.manage.freelancer.domain.entity.mainpage.NotFound;

public interface NotFoundRepository {
    List<NotFound> findAll();

    NotFound save(NotFound notfound);


    
} 
