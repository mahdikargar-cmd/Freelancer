package com.manage.freelancer.infrastructure.persistence.jparepository;

import com.manage.freelancer.infrastructure.persistence.entityDTO.ProfileInformationDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProfileInformationJpaRepository extends JpaRepository<ProfileInformationDTO, Long> {
    Optional<ProfileInformationDTO> findByPhoneNumber(String phoneNumber);
}