package com.manage.freelancer.application.usecase;

import com.manage.freelancer.domain.entity.ProfileInformation;

import java.util.List;
import java.util.Optional;

public interface ProfileInformationUseCase {

    List<ProfileInformation> getAllProfileInformation();
    Optional<ProfileInformation> getProfileInformationByUserId(Long userId);

    Optional<ProfileInformation> getProfileInformationById(long id);

    ProfileInformation updateProfileInformation(Long id,ProfileInformation profileInformation);

    ProfileInformation createProfileInformation(ProfileInformation profileInformation);

    void deleteProfileInformation(long id);

    ProfileInformation getInformationByPhoneNumber(String phoneNumber);

}
