package com.manage.freelancer.domain.repository.mainpage;

import com.manage.freelancer.domain.entity.mainpage.SocialLink;

import java.util.List;
import java.util.Optional;

public interface SocialLinkRepository {
    List<SocialLink> findAll();
    Optional<SocialLink> findById(Long id);
    SocialLink save(SocialLink socialLink);
    void delete(Long id);
    void deleteById(Long id);
}
