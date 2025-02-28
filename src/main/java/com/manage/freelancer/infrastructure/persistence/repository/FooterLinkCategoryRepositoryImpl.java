package com.manage.freelancer.infrastructure.persistence.repository;

import com.manage.freelancer.domain.entity.FooterLink;
import com.manage.freelancer.domain.entity.FooterLinkCategory;
import com.manage.freelancer.domain.repository.FooterLinkCategoryRepository;
import com.manage.freelancer.infrastructure.persistence.entity.FooterLinkCategoryEntity;
import com.manage.freelancer.infrastructure.persistence.entity.FooterLinkEntity;
import com.manage.freelancer.infrastructure.persistence.mapper.FooterMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Repository
@RequiredArgsConstructor
public class FooterLinkCategoryRepositoryImpl implements FooterLinkCategoryRepository {
    private final FooterLinkCategoryJpaRepository categoryJpaRepository;
    private final FooterMapper mapper;

    @Override
    public List<FooterLinkCategory> findAllWithLinks() {
        return categoryJpaRepository.findAllWithLinks()
                .stream()
                .map(mapper::toDomain)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<FooterLinkCategory> findById(Long id) {
        return categoryJpaRepository.findById(id)
                .map(mapper::toDomain);
    }

    @Override
    public FooterLinkCategory save(FooterLinkCategory category) {
        FooterLinkCategoryEntity entity = mapper.toEntity(category);
        FooterLinkCategoryEntity savedEntity = categoryJpaRepository.save(entity);
        return mapper.toDomain(savedEntity);
    }

    @Override
    public void deleteById(Long id) {
        categoryJpaRepository.deleteById(id);
    }
}