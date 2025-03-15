package com.manage.freelancer.infrastructure.persistence.repositoryimpl;

import com.manage.freelancer.domain.entity.ProfileInformation;
import com.manage.freelancer.infrastructure.persistence.entityDTO.ProfileInformationDTO;
import com.manage.freelancer.infrastructure.persistence.jparepository.ProfileInformationJpaRepository;
import com.manage.freelancer.infrastructure.persistence.mapper.ProfileInformationMapper;
import com.manage.freelancer.infrastructure.persistence.repository.ProfileInformationRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Repository
public class ProfileInformationRepositoryImpl implements ProfileInformationRepository {
    private final ProfileInformationMapper profileInformationMapper;
    private final ProfileInformationJpaRepository profileInformationJpaRepository;

    public ProfileInformationRepositoryImpl(ProfileInformationMapper profileInformationMapper, ProfileInformationJpaRepository profileInformationJpaRepository) {
        this.profileInformationMapper = profileInformationMapper;
        this.profileInformationJpaRepository = profileInformationJpaRepository;
    }

    @Override
    public List<ProfileInformation> findAll() {
        return profileInformationJpaRepository.findAll().stream()
                .map(profileInformationMapper::toDomain)
                .collect(Collectors.toList());
    }

    @Override
    public ProfileInformation findOne(Long id) {
        Optional<ProfileInformation> profileOpt = findById(id);
        return profileOpt.orElse(null);
    }

    @Override
    public ProfileInformation save(ProfileInformation profileInformation) {
        ProfileInformationDTO profileInformationDTO = profileInformationMapper.toDTO(profileInformation);
        ProfileInformationDTO savedEntity = profileInformationJpaRepository.save(profileInformationDTO);
        return profileInformationMapper.toDomain(savedEntity);
    }

    @Override
    public void delete(Long id) {
        profileInformationJpaRepository.deleteById(id);
    }

    @Override
    public void delete(ProfileInformation profileInformation) {
        profileInformationJpaRepository.deleteById(profileInformation.getId());
    }

    @Override
    public ProfileInformation update(ProfileInformation profileInformation) {
        // Check if entity exists
        if (!profileInformationJpaRepository.existsById(profileInformation.getId())) {
            return null;
        }

        // Convert to DTO and save
        ProfileInformationDTO profileInformationDTO = profileInformationMapper.toDTO(profileInformation);
        ProfileInformationDTO updatedEntity = profileInformationJpaRepository.save(profileInformationDTO);
        return profileInformationMapper.toDomain(updatedEntity);
    }

    @Override
    public ProfileInformation findByUsername(String username) {
        // Implementation pending
        return null;
    }

    @Override
    public Optional<ProfileInformation> findByEmail(String email) {
        // Implementation pending
        return Optional.empty();
    }

    @Override
    public Optional<ProfileInformation> findByPhoneNumber(String phoneNumber) {
        return profileInformationJpaRepository.findByPhoneNumber(phoneNumber)
                .map(profileInformationMapper::toDomain);
    }

    @Override
    public Optional<ProfileInformation> findById(Long id) {
        return profileInformationJpaRepository.findById(id)
                .map(profileInformationMapper::toDomain);
    }
}