package com.manage.freelancer.infrastructure.persistence.repository.mainpage;

import com.manage.freelancer.domain.entity.mainpage.HeaderLink;

import java.util.List;

public interface HeaderLinkRepository {
    List<HeaderLink> findAll();
    HeaderLink findById(Long id);
    HeaderLink save(HeaderLink headerLink);
    void delete(HeaderLink headerLink);

}
