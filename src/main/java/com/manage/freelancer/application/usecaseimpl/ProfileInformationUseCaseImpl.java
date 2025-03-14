package com.manage.freelancer.application.usecaseimpl;

import com.manage.freelancer.application.usecase.ProfileInformationUseCase;
import com.manage.freelancer.domain.entity.ProfileInformation;
import com.manage.freelancer.infrastructure.persistence.repository.ProfileInformationRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ProfileInformationUseCaseImpl implements ProfileInformationUseCase {
    private final ProfileInformationRepository profileInformationRepository;

    public ProfileInformationUseCaseImpl(ProfileInformationRepository profileInformationRepository) {
        this.profileInformationRepository = profileInformationRepository;
    }

    @Override
    @Transactional
    public ProfileInformation createProfileInformation(ProfileInformation profileInformation) {
        return profileInformationRepository.save(profileInformation);
    }


    @Override
    @Transactional(readOnly = true)
    public List<ProfileInformation> getAllProfileInformation() {
        return profileInformationRepository.findAll();
    }

    @Override
    public ProfileInformation getProfileInformationById(long id) {
        return null;
    }

    @Override
    public ProfileInformation updateProfileInformation(Long id,ProfileInformation profileInformation) {
        return null;
    }


    @Override
    public void deleteProfileInformation(long id) {

    }

    @Override
    public ProfileInformation getInformationByPhoneNumber(String phoneNumber) {
        return null;
    }
}
