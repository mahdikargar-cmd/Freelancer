package com.manage.freelancer.application.service;

import com.manage.freelancer.domain.entity.FooterLinkCategory;
import com.manage.freelancer.domain.entity.SocialLink;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface FooterService {
    List<FooterLinkCategory> getAllFooterLinkCategories();

    List<SocialLink> getAllSocialLinks();

    FooterLinkCategory createCategory(FooterLinkCategory category);

    FooterLinkCategory updateCategory(FooterLinkCategory category);

    @Transactional
    FooterLinkCategory updateCategory(Long id, FooterLinkCategory category);

    void deleteCategory(Long id);

    SocialLink createSocialLink(SocialLink socialLink);

    SocialLink updateSocialLink(Long id, SocialLink socialLink);

    void deleteSocialLink(Long id);
}
