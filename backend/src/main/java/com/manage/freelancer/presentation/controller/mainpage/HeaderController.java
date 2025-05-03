package com.manage.freelancer.presentation.controller.mainpage;

import com.manage.freelancer.application.usecase.mainpage.HeaderUseCase;
import com.manage.freelancer.domain.entity.mainpage.HeaderLink;
import com.manage.freelancer.presentation.response.mainpage.HeaderDataResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class HeaderController {

    private final HeaderUseCase headerUseCase;

    @GetMapping("/getHeader")
    public ResponseEntity<HeaderDataResponse> getHeader() {
        List<HeaderLink> links = headerUseCase.getAllHeaderLinks();
        return ResponseEntity.ok(new HeaderDataResponse(links));
    }

    @PostMapping("/header")
    public ResponseEntity<HeaderLink> createHeader(@Valid @RequestBody HeaderLink headerLink) {
        return ResponseEntity.ok(headerUseCase.createHeaderLink(headerLink));
    }

    @PutMapping("/header/{id}")
    public ResponseEntity<HeaderLink> updateHeader(@PathVariable Long id, @Valid @RequestBody HeaderLink headerLink) {
        return ResponseEntity.ok(headerUseCase.updateHeaderLink(id, headerLink));
    }

    @DeleteMapping("/header/{id}")
    public ResponseEntity<Void> deleteHeader(@PathVariable Long id) {
        headerUseCase.deleteHeaderLink(id);
        return ResponseEntity.noContent().build();
    }
}