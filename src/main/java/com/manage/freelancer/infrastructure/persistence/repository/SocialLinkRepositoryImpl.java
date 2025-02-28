package com.manage.freelancer.infrastructure.persistence.repository;

import com.manage.freelancer.domain.entity.SocialLink;
import com.manage.freelancer.domain.repository.SocialLinkRepository;
import com.manage.freelancer.infrastructure.persistence.entity.SocialLinkEntity;
import com.manage.freelancer.infrastructure.persistence.mapper.SocialLinkMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Repository
@RequiredArgsConstructor
public class SocialLinkRepositoryImpl implements SocialLinkRepository {
    private final SocialLinkJpaRepository socialLinkJpaRepository;
    private final SocialLinkMapper mapper;

    @Override
    public List<SocialLink> findAll() {
        return socialLinkJpaRepository.findAll()
                .stream()
                .map(mapper::toDomain)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<SocialLink> findById(Long id) {
        return socialLinkJpaRepository.findById(id)
                .map(mapper::toDomain);
    }

    @Override
    public SocialLink save(SocialLink socialLink) {
        SocialLinkEntity entity = mapper.toEntity(socialLink);
        SocialLinkEntity savedEntity = socialLinkJpaRepository.save(entity);
        return mapper.toDomain(savedEntity);
    }

    @Override
    public void delete(Long id) {

    }

    @Override
    public void deleteById(Long id) {
        socialLinkJpaRepository.deleteById(id);
    }
}