package com.manage.freelancer.application.usecaseimpl.mainpage;

import com.manage.freelancer.application.usecase.mainpage.FooterUseCase;
import com.manage.freelancer.domain.entity.mainpage.FooterLinkCategory;
import com.manage.freelancer.domain.entity.mainpage.SocialLink;
import com.manage.freelancer.infrastructure.persistence.repository.mainpage.FooterLinkCategoryRepository;
import com.manage.freelancer.infrastructure.persistence.repository.mainpage.SocialLinkRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FooterUseCaseImpl implements FooterUseCase {
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
        List<SocialLink> links = socialLinkRepository.findAll();
        System.out.println("Retrieved " + links.size() + " social links");
        return links;
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
    @Transactional
    public void deleteSocialLink(Long id) {
        socialLinkRepository.deleteById(id);
    }
}
