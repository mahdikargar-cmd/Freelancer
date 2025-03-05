package com.manage.freelancer.presentation.controller.mainpage;


import com.manage.freelancer.application.service.mainpage.HeaderService;
import com.manage.freelancer.domain.entity.mainpage.HeaderLink;
import com.manage.freelancer.presentation.dto.mainpage.HeaderDataResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/")
@RequiredArgsConstructor
public class HeaderController {

    private final HeaderService headerService;

    @GetMapping("/getHeader")
    public ResponseEntity<HeaderDataResponse> getHeader() {
        List<HeaderLink> links = headerService.getAllHeaderLinks();
        return ResponseEntity.ok(new HeaderDataResponse(links));
    }

    @PostMapping("/header")
    public ResponseEntity<HeaderLink> createHeader(@RequestBody HeaderLink headerLink) {
        return ResponseEntity.ok(headerService.createHeaderLink(headerLink));

    }

    @PutMapping("/header/{id}")
    public ResponseEntity<HeaderLink> updateHeader(@PathVariable Long id, @RequestBody HeaderLink headerLink) {
        return ResponseEntity.ok(headerService.updateHeaderLink(id, headerLink));

    }

    @DeleteMapping("/header/{id}")
    public ResponseEntity<Void> deleteHeader(@PathVariable Long id) {
        headerService.deleteHeaderLink(id);
        return ResponseEntity.noContent().build();
    }
}
