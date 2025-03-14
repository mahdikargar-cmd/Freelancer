package com.manage.freelancer.infrastructure.persistence.repository.mainpage;

import com.manage.freelancer.domain.entity.mainpage.FooterLinkCategory;

import java.util.List;
import java.util.Optional;

public interface FooterLinkCategoryRepository {

    List<FooterLinkCategory> findAllWithLinks();

    Optional<FooterLinkCategory> findById(Long id);

    FooterLinkCategory save(FooterLinkCategory footerLinkCategory);

    void deleteById(Long id);
}
