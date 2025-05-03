package com.manage.freelancer.application.usecaseimpl.mainpage;

import com.manage.freelancer.application.usecase.mainpage.NotFoundUseCase;
import com.manage.freelancer.domain.entity.mainpage.NotFound;
import com.manage.freelancer.infrastructure.persistence.repository.mainpage.NotFoundRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NotFoundUseCaseImpl implements NotFoundUseCase {

    private final NotFoundRepository notFoundRepository;

    @Override
    public List<NotFound> getAllNotFounds() {
        return notFoundRepository.findAll();
    }

    @Override
    public NotFound create(NotFound notFound) {
        return notFoundRepository.save(notFound);
    }

    @Override
    public NotFound updateFound(NotFound notFound) {
        return notFoundRepository.save(notFound);
    }
}
