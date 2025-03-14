package com.manage.freelancer.infrastructure.persistence.repositoryimpl;

import com.manage.freelancer.domain.entity.ProfileInformation;
import com.manage.freelancer.infrastructure.persistence.entityDTO.ProfileInformationDTO;
import com.manage.freelancer.infrastructure.persistence.jparepository.ProfileInformationJpaRepository;
import com.manage.freelancer.infrastructure.persistence.mapper.ProfileInformationMapper;
import com.manage.freelancer.infrastructure.persistence.repository.ProfileInformationRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.stream.Collectors;

@Repository
public class ProfileInformationRepositoryImpl implements ProfileInformationRepository {
    private ProfileInformationMapper profileInformationMapper;
    private final ProfileInformationJpaRepository profileInformationJpaRepository;

    public ProfileInformationRepositoryImpl(ProfileInformationMapper profileInformationMapper, ProfileInformationJpaRepository profileInformationJpaRepository) {
        this.profileInformationMapper = profileInformationMapper;

        this.profileInformationJpaRepository = profileInformationJpaRepository;
    }

    @Override
    public List<ProfileInformation> findAll() {
        return profileInformationJpaRepository.findAll().stream().map(profileInformationMapper::toDomain).collect(Collectors.toList());
    }
    @Override
    public ProfileInformation save(ProfileInformation profileInformation) {
        ProfileInformationDTO profileInformationdto = profileInformationMapper.toDTO(profileInformation);
        ProfileInformationDTO savedEntity = profileInformationJpaRepository.save(profileInformationdto);
        return profileInformationMapper.toDomain(savedEntity);
    }

    @Override
    public void delete(Long id) {

    }

    @Override
    public ProfileInformation findOne(Long id) {
        return null;
    }



    @Override
    public void delete(ProfileInformation profileInformation) {
        profileInformationJpaRepository.deleteById(profileInformation.getId());
    }

    @Override
    public ProfileInformation update(ProfileInformation profileInformation) {
        return null;
    }

    @Override
    public ProfileInformation findByUsername(String username) {
        return null;
    }

    @Override
    public ProfileInformation findByEmail(String email) {
        return null;
    }

    @Override
    public ProfileInformation findById(Long id) {
        return null;
    }
}
