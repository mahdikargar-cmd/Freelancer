package com.manage.freelancer.presentation.controller;

import com.manage.freelancer.application.usecase.ProfileInformationUseCase;
import com.manage.freelancer.domain.entity.ProfileInformation;
import com.manage.freelancer.presentation.response.ProfileInformationResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/")
@RequiredArgsConstructor
public class ProfileInformationController {
    private final ProfileInformationUseCase profileInformationUseCase;

    @GetMapping("/getProfileInformation")
    public ResponseEntity<ProfileInformationResponse> getProfileInformation() {
        List<ProfileInformation> lists = profileInformationUseCase.getAllProfileInformation();

        if (lists.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(new ProfileInformationResponse(lists.get(0)));  // فقط اولین پروفایل را ارسال می‌کنیم
    }


    @PostMapping("/createProfileInformation")
    public ResponseEntity<ProfileInformation> createProfileInformation(@RequestBody ProfileInformation profileInformation) {
        return ResponseEntity.ok(profileInformationUseCase.createProfileInformation(profileInformation));
    }

    @PutMapping("/ProfileInformation/{id}")
    public ResponseEntity<ProfileInformation> updateProfileInformation(@PathVariable Long id, @RequestBody ProfileInformation profileInformation) {
        return ResponseEntity.ok(profileInformationUseCase.updateProfileInformation(id, profileInformation));
    }

    @DeleteMapping("/DelProfileInformation")
    public ResponseEntity<ProfileInformationResponse> deleteProfileInformation(@PathVariable Long id) {
        profileInformationUseCase.deleteProfileInformation(id);
        return ResponseEntity.ok().build();
    }
}
