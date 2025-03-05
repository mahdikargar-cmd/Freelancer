package com.manage.freelancer.infrastructure.persistence.mapper.mainpage;

import com.manage.freelancer.domain.entity.mainpage.SocialLink;
import com.manage.freelancer.infrastructure.persistence.entity.mainpage.SocialLinkEntity;
import org.springframework.stereotype.Component;

@Component
public class SocialLinkMapper {

    public SocialLink toDomain(SocialLinkEntity entity) {
        if (entity == null) {
            return null;
        }

        return SocialLink.builder()
                .id(entity.getId())
                .name(entity.getName())
                .icon(entity.getIcon())
                .url(entity.getUrl())
                .build();
    }

    public SocialLinkEntity toEntity(SocialLink domain) {
        if (domain == null) {
            return null;
        }

        return SocialLinkEntity.builder()
                .id(domain.getId())
                .name(domain.getName())
                .icon(domain.getIcon())
                .url(domain.getUrl())
                .build();
    }
}