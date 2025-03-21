package com.manage.freelancer.presentation.controller.mainpage;

import com.manage.freelancer.application.usecase.mainpage.FooterUseCase;
import com.manage.freelancer.domain.entity.mainpage.FooterLinkCategory;
import com.manage.freelancer.domain.entity.mainpage.SocialLink;
import com.manage.freelancer.presentation.response.mainpage.FooterDataResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/footer")
@RequiredArgsConstructor
public class FooterController {
    private final FooterUseCase footerUseCase;

    @GetMapping
    public ResponseEntity<FooterDataResponse> getFooterData() {
        List<FooterLinkCategory> categories = footerUseCase.getAllFooterLinkCategories();
        List<SocialLink> socialLinks = footerUseCase.getAllSocialLinks();

        return ResponseEntity.ok(new FooterDataResponse(categories, socialLinks));
    }


    @PostMapping("/categories")
    public ResponseEntity<FooterLinkCategory> createCategory(@RequestBody FooterLinkCategory category) {
        return ResponseEntity.ok(footerUseCase.createCategory(category));
    }

    @PutMapping("/categories/{id}")
    public ResponseEntity<FooterLinkCategory> updateCategory(
            @PathVariable Long id,
            @RequestBody FooterLinkCategory category) {
        return ResponseEntity.ok(footerUseCase.updateCategory(id, category));
    }

    @DeleteMapping("/categories/{id}")
    public ResponseEntity<Void> deleteCategory(@PathVariable Long id) {
        footerUseCase.deleteCategory(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/socialLinks")
    public ResponseEntity<SocialLink> createSocialLink(@RequestBody SocialLink socialLink) {
        return ResponseEntity.ok(footerUseCase.createSocialLink(socialLink));
    }

    @PutMapping("/socialLinks/{id}")
    public ResponseEntity<SocialLink> updateSocialLink(
            @PathVariable Long id,
            @RequestBody SocialLink socialLink) {
        return ResponseEntity.ok(footerUseCase.updateSocialLink(id, socialLink));
    }

    @DeleteMapping("/socialLinks/{id}")
    public ResponseEntity<Void> deleteSocialLink(@PathVariable Long id) {
        footerUseCase.deleteSocialLink(id);
        return ResponseEntity.noContent().build();
    }
}