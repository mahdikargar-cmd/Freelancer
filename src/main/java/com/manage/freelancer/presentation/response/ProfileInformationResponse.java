package com.manage.freelancer.presentation.response;

import com.manage.freelancer.domain.entity.ProfileInformation;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@Data
@NoArgsConstructor
public class ProfileInformationResponse {
    private Long id;
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String profileImageUrl;
    private String address;
    private String placeOfStudy;
    private Object user;

    public ProfileInformationResponse(ProfileInformation profile) {
        this.id = profile.getId();
        this.firstName = profile.getFirstName();
        this.lastName = profile.getLastName();
        this.phoneNumber = profile.getPhoneNumber();
        this.profileImageUrl = profile.getProfileImageUrl();
        this.address = profile.getAddress();
        this.placeOfStudy = profile.getPlaceOfStudy();

        if (profile.getUser() != null) {
            this.user = Map.of("id", profile.getUser().getId());
        }
    }
}