package com.manage.freelancer.infrastructure.persistence.mapper.mainpage;

import com.manage.freelancer.domain.entity.mainpage.HeaderLink;
import com.manage.freelancer.infrastructure.persistence.entityDTO.mainpage.HeaderLinkEntity;
import org.springframework.stereotype.Component;

@Component
public class HeaderMapper {

    public HeaderLink toDomain(HeaderLinkEntity headerLinkEntity) {
        if (headerLinkEntity == null) return null;
        return HeaderLink.builder()
                .id(headerLinkEntity.getId())
                .title(headerLinkEntity.getTitle())
                .titleId(headerLinkEntity.getTitleId())
                .link(headerLinkEntity.getLink())
                .build();
    }

    public HeaderLinkEntity toEntity(HeaderLink headerLink) {
        if (headerLink == null) return null;
        return HeaderLinkEntity.builder()
                .id(headerLink.getId())
                .title(headerLink.getTitle())
                .titleId(headerLink.getTitleId())
                .link(headerLink.getLink())
                .build();
    }
}
