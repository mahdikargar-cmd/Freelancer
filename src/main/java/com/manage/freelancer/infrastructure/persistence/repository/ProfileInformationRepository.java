package com.manage.freelancer.infrastructure.persistence.repository;

import com.manage.freelancer.domain.entity.ProfileInformation;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProfileInformationRepository {
    List<ProfileInformation> findAll();
    Optional<ProfileInformation> findByUserId(Long userId);

    Optional<ProfileInformation> findById(Long id);

    ProfileInformation save(ProfileInformation profileInformation);

    void delete(Long id);

    ProfileInformation update(ProfileInformation profileInformation);

    Optional<ProfileInformation> findByPhoneNumber(String phoneNumber);
}