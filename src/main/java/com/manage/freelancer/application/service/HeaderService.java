package com.manage.freelancer.application.service;

import com.manage.freelancer.domain.entity.HeaderLink;

import java.util.List;

public interface HeaderService {
    List<HeaderLink> getAllHeaderLinks();

    HeaderLink createHeaderLink(HeaderLink headerLink);

    HeaderLink updateHeaderLink(Long id, HeaderLink headerLink);
    void deleteHeaderLink(Long headerLink);
    HeaderLink getHeaderLinkById(Long id);
    HeaderLink getHeaderLinkByName(String headerName);
}
