package com.manage.freelancer.application.usecase.mainpage;

import com.manage.freelancer.domain.entity.mainpage.HeaderLink;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface HeaderUseCase {
    List<HeaderLink> getAllHeaderLinks();

    HeaderLink createHeaderLink(HeaderLink headerLink);

    HeaderLink updateHeaderLink(Long id, HeaderLink headerLink);
    void deleteHeaderLink(Long headerLink);

    @Transactional(readOnly = true)
    HeaderLink getHeaderLinkById(Long id);

    @Transactional(readOnly = true)
    HeaderLink getHeaderLinkByName(String headerName);
}
