package com.manage.freelancer.presentation.controller.mainpage;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.manage.freelancer.application.usecase.mainpage.NotFoundUseCase;
import com.manage.freelancer.domain.entity.mainpage.NotFound;
import com.manage.freelancer.presentation.response.mainpage.NotFoundDataResponse;

import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class NotFoundController {

    private final NotFoundUseCase notFoundUseCase;

    @GetMapping("/notfound")
    public ResponseEntity<NotFoundDataResponse> getNotFound() {
        List<NotFound> links = notFoundUseCase.getAllNotFounds();
        return ResponseEntity.ok(new NotFoundDataResponse(links));
    }

    @PostMapping("/notfound/create")
    public ResponseEntity<NotFound> createEntity(@RequestBody NotFound notFound) {
        return ResponseEntity.ok(notFoundUseCase.create(notFound));
    }
}
