package com.manage.freelancer.application.service;

import java.util.List;

import com.manage.freelancer.domain.entity.NotFound;


public interface NotFoundService{
    List<NotFound> getAllNotFounds();
    NotFound create(NotFound notfound);
    NotFound updateFound(NotFound notfound);
    
}
