package com.manage.freelancer.application.usecase;

import com.manage.freelancer.domain.entity.ProfileInformation;

import java.util.List;

public interface ProfileInformationUseCase {


    List<ProfileInformation> getAllProfileInformation();

    ProfileInformation getProfileInformationById(long id);

    ProfileInformation updateProfileInformation(Long id,ProfileInformation profileInformation);

    ProfileInformation createProfileInformation(ProfileInformation profileInformation);

    void deleteProfileInformation(long id);

    ProfileInformation getInformationByPhoneNumber(String phoneNumber);

}
