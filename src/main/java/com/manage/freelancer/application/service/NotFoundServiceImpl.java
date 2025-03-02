package com.manage.freelancer.application.service;

import com.manage.freelancer.domain.entity.NotFound;
import com.manage.freelancer.domain.repository.NotFoundRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NotFoundServiceImpl implements NotFoundService {

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
