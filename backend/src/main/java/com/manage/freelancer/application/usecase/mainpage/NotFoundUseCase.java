package com.manage.freelancer.application.usecase.mainpage;

import java.util.List;

import com.manage.freelancer.domain.entity.mainpage.NotFound;


public interface NotFoundUseCase {
    List<NotFound> getAllNotFounds();
    NotFound create(NotFound notfound);
    NotFound updateFound(NotFound notfound);
    
}
