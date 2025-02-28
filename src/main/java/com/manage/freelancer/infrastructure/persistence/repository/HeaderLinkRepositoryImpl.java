package com.manage.freelancer.infrastructure.persistence.repository;

import com.manage.freelancer.domain.entity.HeaderLink;
import com.manage.freelancer.domain.repository.HeaderLinkRepository;
import com.manage.freelancer.infrastructure.persistence.entity.HeaderLinkEntity;
import com.manage.freelancer.infrastructure.persistence.mapper.HeaderMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.stream.Collector;
import java.util.stream.Collectors;


@Repository
@RequiredArgsConstructor
public class HeaderLinkRepositoryImpl implements HeaderLinkRepository {

    private final HeaderMapper headerMapper;
    private final HeaderLinkJpaRepository headerLinkJpaRepository;


    @Override
    public List<HeaderLink> findAll() {
        return headerLinkJpaRepository.findAll()  // تغییر از `headerLinkRepository` به `headerLinkJpaRepository`
                .stream()
                .map(headerMapper::toDomain)
                .collect(Collectors.toList());
    }

    @Override
    public HeaderLink findById(Long id) {
        return headerLinkJpaRepository.findById(id)
                .map(headerMapper::toDomain)
                .orElse(null); // در صورت نبودن مقدار، مقدار `null` برگردانده شود
    }


    @Override
    public HeaderLink save(HeaderLink headerLink) {
        HeaderLinkEntity headerLinkEntity = headerMapper.toEntity(headerLink);
        HeaderLinkEntity savedEntity = headerLinkJpaRepository.save(headerLinkEntity);
        return headerMapper.toDomain(savedEntity);
    }

    @Override
    public void delete(HeaderLink headerLink) {
        headerLinkJpaRepository.deleteById(headerLink.getId());
    }
}
