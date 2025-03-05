package com.manage.freelancer.infrastructure.persistence.repository.mainpage;

import java.util.List;
import java.util.stream.Collectors;

import com.manage.freelancer.domain.entity.mainpage.NotFound;
import com.manage.freelancer.domain.repository.mainpage.NotFoundRepository;
import com.manage.freelancer.infrastructure.persistence.entity.mainpage.NotFoundEntity;
import com.manage.freelancer.infrastructure.persistence.mapper.mainpage.NotFoundMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class NotFoundRepositoryImpl implements NotFoundRepository {

    private final NotFoundMapper mapper;
    private final NotFoundJpaRepository notFoundJpaRepository;

    @Override
    public List<NotFound> findAll() {
        return notFoundJpaRepository.findAll()
                .stream()
                .map(mapper::toDomain)
                .collect(Collectors.toList());
    }

    @Override
    public NotFound save(NotFound notFound) {
        NotFoundEntity entity = mapper.toEntity(notFound);
        NotFoundEntity savedEntity = notFoundJpaRepository.save(entity);
        return mapper.toDomain(savedEntity);
    }
}

