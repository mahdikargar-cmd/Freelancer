package com.manage.freelancer.infrastructure.persistence.repositoryimpl.mainpage;

import com.manage.freelancer.domain.entity.mainpage.FooterLinkCategory;
import com.manage.freelancer.infrastructure.persistence.repository.mainpage.FooterLinkCategoryRepository;
import com.manage.freelancer.infrastructure.persistence.entityDTO.mainpage.FooterLinkCategoryEntity;
import com.manage.freelancer.infrastructure.persistence.jparepository.mainpage.FooterLinkCategoryJpaRepository;
import com.manage.freelancer.infrastructure.persistence.mapper.mainpage.FooterMapper;
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