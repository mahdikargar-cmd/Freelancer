package com.manage.freelancer.application.service.mainpage;

import java.util.List;

import com.manage.freelancer.domain.entity.mainpage.NotFound;


public interface NotFoundService{
    List<NotFound> getAllNotFounds();
    NotFound create(NotFound notfound);
    NotFound updateFound(NotFound notfound);
    
}
