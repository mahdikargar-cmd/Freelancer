package com.manage.freelancer.application.service;

import com.manage.freelancer.domain.entity.FooterLinkCategory;
import com.manage.freelancer.domain.entity.SocialLink;
import com.manage.freelancer.domain.repository.FooterLinkCategoryRepository;
import com.manage.freelancer.domain.repository.SocialLinkRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FooterServiceImpl implements FooterService {
    private final FooterLinkCategoryRepository categoryRepository;
    private final SocialLinkRepository socialLinkRepository;


    @Override
    @Transactional(readOnly = true)
    public List<FooterLinkCategory> getAllFooterLinkCategories() {

        return categoryRepository.findAllWithLinks();
    }

    @Override
    @Transactional(readOnly = true)

    public List<SocialLink> getAllSocialLinks() {
        return socialLinkRepository.findAll();
    }

    @Override
    @Transactional
    public FooterLinkCategory createCategory(FooterLinkCategory category) {
        return categoryRepository.save(category);
    }

    @Override
    public FooterLinkCategory updateCategory(FooterLinkCategory category) {
        return null;
    }

    @Transactional
    @Override
    public FooterLinkCategory updateCategory(Long id, FooterLinkCategory category) {
        category.setId(id);
        return categoryRepository.save(category);
    }

    @Override
    @Transactional
    public void deleteCategory(Long id) {
        categoryRepository.deleteById(id);
    }

    @Override
    @Transactional
    public SocialLink createSocialLink(SocialLink socialLink) {
        return socialLinkRepository.save(socialLink);
    }

    @Override
    @Transactional
    public SocialLink updateSocialLink(Long id, SocialLink socialLink) {
        socialLink.setId(id);
        return socialLinkRepository.save(socialLink);
    }

    @Override
    public void deleteSocialLink(Long id) {

    }
}
