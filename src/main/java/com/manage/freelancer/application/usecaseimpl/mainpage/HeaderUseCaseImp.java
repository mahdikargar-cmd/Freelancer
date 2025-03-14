package com.manage.freelancer.application.usecaseimpl.mainpage;

import com.manage.freelancer.application.usecase.mainpage.HeaderUseCase;
import com.manage.freelancer.domain.entity.mainpage.HeaderLink;
import com.manage.freelancer.infrastructure.persistence.repository.mainpage.HeaderLinkRepository;
import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class HeaderUseCaseImp implements HeaderUseCase {
    private final HeaderLinkRepository headerLinkRepository;


    @Override
    @Transactional(readOnly = true)
    public List<HeaderLink> getAllHeaderLinks() {
        return headerLinkRepository.findAll();
    }

    @Override
    @Transactional
    public HeaderLink createHeaderLink(HeaderLink headerLink) {
        return headerLinkRepository.save(headerLink);
    }

    @Override
    @Transactional
    public HeaderLink updateHeaderLink(Long id, HeaderLink headerLink) {
        return null;
    }

    @Override
    public void deleteHeaderLink(Long headerLink) {

    }

    @Override
    public HeaderLink getHeaderLinkById(Long id) {
        return null;
    }

    @Override
    public HeaderLink getHeaderLinkByName(String headerName) {
        return null;
    }
}
