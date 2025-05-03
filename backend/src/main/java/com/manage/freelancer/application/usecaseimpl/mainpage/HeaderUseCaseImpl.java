package com.manage.freelancer.application.usecaseimpl.mainpage;

import com.manage.freelancer.application.usecase.mainpage.HeaderUseCase;
import com.manage.freelancer.domain.entity.mainpage.HeaderLink;
import com.manage.freelancer.infrastructure.persistence.repository.mainpage.HeaderLinkRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class HeaderUseCaseImpl implements HeaderUseCase {
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
        HeaderLink existingLink = headerLinkRepository.findById(id);
        if (existingLink == null) {
            throw new IllegalArgumentException("لینک هدر با شناسه " + id + " یافت نشد");
        }
        existingLink.setTitle(headerLink.getTitle());
        existingLink.setTitleId(headerLink.getTitleId());
        existingLink.setLink(headerLink.getLink());
        return headerLinkRepository.save(existingLink);
    }

    @Override
    @Transactional
    public void deleteHeaderLink(Long id) {
        HeaderLink headerLink = headerLinkRepository.findById(id);
        if (headerLink == null) {
            throw new IllegalArgumentException("لینک هدر با شناسه " + id + " یافت نشد");
        }
        headerLinkRepository.delete(headerLink);
    }

    @Transactional(readOnly = true)
    @Override
    public HeaderLink getHeaderLinkById(Long id) {
        return headerLinkRepository.findById(id);
    }

    @Transactional(readOnly = true)
    @Override
    public HeaderLink getHeaderLinkByName(String headerName) {
        return headerLinkRepository.findAll()
                .stream()
                .filter(link -> link.getTitle().equalsIgnoreCase(headerName))
                .findFirst()
                .orElse(null);
    }
}