package com.manage.freelancer.application.usecase.mainpage;

import com.manage.freelancer.domain.entity.mainpage.FooterLinkCategory;
import com.manage.freelancer.domain.entity.mainpage.SocialLink;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface FooterUseCase {
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
