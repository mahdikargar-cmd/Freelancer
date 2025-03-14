package com.manage.freelancer.infrastructure.persistence.repository;

import com.manage.freelancer.domain.entity.ProfileInformation;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProfileInformationRepository {
     List<ProfileInformation> findAll();

    ProfileInformation findOne(Long id);

    ProfileInformation save(ProfileInformation profileInformation);

    void delete(Long id);

    void delete(ProfileInformation profileInformation);

    ProfileInformation update(ProfileInformation profileInformation);

    ProfileInformation findByUsername(String username);

    ProfileInformation findByEmail(String email);

    ProfileInformation findById(Long id);
}
