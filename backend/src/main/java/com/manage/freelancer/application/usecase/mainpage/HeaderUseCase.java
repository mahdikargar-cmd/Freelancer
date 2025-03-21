package com.manage.freelancer.application.usecase.mainpage;

import com.manage.freelancer.domain.entity.mainpage.HeaderLink;

import java.util.List;

public interface HeaderUseCase {
    List<HeaderLink> getAllHeaderLinks();

    HeaderLink createHeaderLink(HeaderLink headerLink);

    HeaderLink updateHeaderLink(Long id, HeaderLink headerLink);
    void deleteHeaderLink(Long headerLink);
    HeaderLink getHeaderLinkById(Long id);
    HeaderLink getHeaderLinkByName(String headerName);
}
