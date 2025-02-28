package com.manage.freelancer.presentation.controller;

import com.manage.freelancer.application.service.FooterService;
import com.manage.freelancer.domain.entity.FooterLinkCategory;
import com.manage.freelancer.domain.entity.SocialLink;
import com.manage.freelancer.presentation.dto.FooterDataResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/footer")
@RequiredArgsConstructor
public class FooterController {
    private final FooterService footerService;

    @GetMapping
    public ResponseEntity<FooterDataResponse> getFooterData() {
        List<FooterLinkCategory> categories = footerService.getAllFooterLinkCategories();
        List<SocialLink> socialLinks = footerService.getAllSocialLinks();

        return ResponseEntity.ok(new FooterDataResponse(categories, socialLinks));
    }


    @PostMapping("/categories")
    public ResponseEntity<FooterLinkCategory> createCategory(@RequestBody FooterLinkCategory category) {
        return ResponseEntity.ok(footerService.createCategory(category));
    }

    @PutMapping("/categories/{id}")
    public ResponseEntity<FooterLinkCategory> updateCategory(
            @PathVariable Long id,
            @RequestBody FooterLinkCategory category) {
        return ResponseEntity.ok(footerService.updateCategory(id, category));
    }

    @DeleteMapping("/categories/{id}")
    public ResponseEntity<Void> deleteCategory(@PathVariable Long id) {
        footerService.deleteCategory(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/socialLinks")
    public ResponseEntity<SocialLink> createSocialLink(@RequestBody SocialLink socialLink) {
        return ResponseEntity.ok(footerService.createSocialLink(socialLink));
    }

    @PutMapping("/socialLinks/{id}")
    public ResponseEntity<SocialLink> updateSocialLink(
            @PathVariable Long id,
            @RequestBody SocialLink socialLink) {
        return ResponseEntity.ok(footerService.updateSocialLink(id, socialLink));
    }

    @DeleteMapping("/socialLinks/{id}")
    public ResponseEntity<Void> deleteSocialLink(@PathVariable Long id) {
        footerService.deleteSocialLink(id);
        return ResponseEntity.noContent().build();
    }
}