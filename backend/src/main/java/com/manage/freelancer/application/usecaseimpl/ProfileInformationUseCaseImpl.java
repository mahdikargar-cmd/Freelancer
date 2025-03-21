package com.manage.freelancer.application.usecaseimpl;

import com.manage.freelancer.application.usecase.ProfileInformationUseCase;
import com.manage.freelancer.domain.entity.ProfileInformation;
import com.manage.freelancer.infrastructure.persistence.repository.ProfileInformationRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;

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
    public Optional<ProfileInformation> getProfileInformationByUserId(Long userId) {
        return profileInformationRepository.findByUserId(userId);
    }


    @Override
    @Transactional(readOnly = true)
    public List<ProfileInformation> getAllProfileInformation() {
        return profileInformationRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<ProfileInformation> getProfileInformationById(long id) {
        return profileInformationRepository.findById(id);
    }

    @Override
    @Transactional
    public ProfileInformation updateProfileInformation(Long id, ProfileInformation profileInformation) {
        Optional<ProfileInformation> existingProfileOpt = profileInformationRepository.findById(id);

        if (existingProfileOpt.isEmpty()) {
            return null;
        }

        ProfileInformation existingProfile = existingProfileOpt.get();
        profileInformation.setId(id);

        if (profileInformation.getUser() == null) {
            profileInformation.setUser(existingProfile.getUser());
        }

        return profileInformationRepository.update(profileInformation);
    }

    @Override
    @Transactional
    public void deleteProfileInformation(long id) {
        if (profileInformationRepository.findById(id).isPresent()) {
            profileInformationRepository.delete(id);
        }
    }

    @Override
    @Transactional(readOnly = true)
    public ProfileInformation getInformationByPhoneNumber(String phoneNumber) {
        Optional<ProfileInformation> profileOpt = profileInformationRepository.findByPhoneNumber(phoneNumber);
        return profileOpt.orElse(null);
    }
}