package com.manage.freelancer.infrastructure.persistence.mapper;

import com.manage.freelancer.domain.entity.HeaderLink;
import com.manage.freelancer.infrastructure.persistence.entity.HeaderLinkEntity;
import org.springframework.stereotype.Component;

@Component
public class HeaderMapper {

    public HeaderLink toDomain(HeaderLinkEntity headerLinkEntity) {
        if (headerLinkEntity == null) return null;
        return HeaderLink.builder()
                .id(headerLinkEntity.getId())
                .title(headerLinkEntity.getTitle())
                .titleId(Long.valueOf(headerLinkEntity.getTitleId()))
                .build();

    }
    public HeaderLinkEntity toEntity(HeaderLink headerLink) {
        if (headerLink == null) return null;

        return HeaderLinkEntity.builder()
                .id(headerLink.getId())
                .title(headerLink.getTitle())
                .titleId(String.valueOf(headerLink.getTitleId()))
                .build();

    }

}
