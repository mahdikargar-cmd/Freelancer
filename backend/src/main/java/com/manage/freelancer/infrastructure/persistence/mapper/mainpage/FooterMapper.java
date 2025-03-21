package com.manage.freelancer.infrastructure.persistence.mapper.mainpage;

import com.manage.freelancer.domain.entity.mainpage.FooterLink;
import com.manage.freelancer.domain.entity.mainpage.FooterLinkCategory;
import com.manage.freelancer.infrastructure.persistence.entityDTO.mainpage.FooterLinkCategoryEntity;
import com.manage.freelancer.infrastructure.persistence.entityDTO.mainpage.FooterLinkEntity;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class FooterMapper {

    public FooterLinkCategory toDomain(FooterLinkCategoryEntity entity) {
        if (entity == null) {
            return null;
        }

        List<FooterLink> links = entity.getLinks().stream()
                .map(this::toDomain)
                .collect(Collectors.toList());

        return FooterLinkCategory.builder()
                .id(entity.getId())
                .title(entity.getTitle())
                .links(links)
                .build();
    }

    public FooterLink toDomain(FooterLinkEntity entity) {
        if (entity == null) {
            return null;
        }

        return FooterLink.builder()
                .id(entity.getId())
                .name(entity.getName())
                .url(entity.getUrl())
                .categoryId(entity.getCategory() != null ? entity.getCategory().getId() : null)
                .build();
    }

    public FooterLinkCategoryEntity toEntity(FooterLinkCategory domain) {
        if (domain == null) {
            return null;
        }

        FooterLinkCategoryEntity entity = FooterLinkCategoryEntity.builder()
                .id(domain.getId())
                .title(domain.getTitle())
                .links(new ArrayList<>())
                .build();

        if (domain.getLinks() != null) {
            List<FooterLinkEntity> linkEntities = domain.getLinks().stream()
                    .map(link -> {
                        FooterLinkEntity linkEntity = toEntity(link);
                        linkEntity.setCategory(entity);
                        return linkEntity;
                    })
                    .collect(Collectors.toList());
            entity.setLinks(linkEntities);
        }

        return entity;
    }

    public FooterLinkEntity toEntity(FooterLink domain) {
        if (domain == null) {
            return null;
        }

        return FooterLinkEntity.builder()
                .id(domain.getId())
                .name(domain.getName())
                .url(domain.getUrl())
                .build();
    }
}
