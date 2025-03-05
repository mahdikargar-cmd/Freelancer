package com.manage.freelancer.domain.repository.mainpage;

import com.manage.freelancer.domain.entity.mainpage.FooterLink;

import java.util.List;
import java.util.Optional;

public interface FooterLinkRepository {
    List<FooterLink> findAll();

    List<FooterLink> findByCategoryID(Long categoryID);

    Optional<FooterLink> findById(Long id);

    FooterLink save(FooterLink footerLink);

    void delete(Long id);
}
