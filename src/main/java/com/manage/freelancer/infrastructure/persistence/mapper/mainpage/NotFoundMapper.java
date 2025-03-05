package com.manage.freelancer.infrastructure.persistence.mapper.mainpage;

import com.manage.freelancer.domain.entity.mainpage.NotFound;
import com.manage.freelancer.infrastructure.persistence.entity.mainpage.NotFoundEntity;
import org.springframework.stereotype.Component;

@Component
public class NotFoundMapper {

    public NotFound toDomain(NotFoundEntity notFoundEntity) {
        if (notFoundEntity == null) {
            return null;
        }
        return NotFound.builder()
                .id(notFoundEntity.getId())
                .first(notFoundEntity.getFirst())
                .second(notFoundEntity.getSecond())
                .build();
    }

    public NotFoundEntity toEntity(NotFound notFound) {
        if (notFound == null) {
            return null;
        }
        return NotFoundEntity.builder()
                .id(notFound.getId())
                .first(notFound.getFirst())
                .second(notFound.getSecond())
                .build();
    }
}

