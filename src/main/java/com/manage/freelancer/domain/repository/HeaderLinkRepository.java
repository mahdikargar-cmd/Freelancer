package com.manage.freelancer.domain.repository;

import com.manage.freelancer.domain.entity.HeaderLink;

import java.util.List;

public interface HeaderLinkRepository {
    List<HeaderLink> findAll();
    HeaderLink findById(Long id);
    HeaderLink save(HeaderLink headerLink);
    void delete(HeaderLink headerLink);

}
