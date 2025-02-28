package com.manage.freelancer.infrastructure.persistence.mapper;

import com.manage.freelancer.domain.entity.SocialLink;
import com.manage.freelancer.infrastructure.persistence.entity.SocialLinkEntity;
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