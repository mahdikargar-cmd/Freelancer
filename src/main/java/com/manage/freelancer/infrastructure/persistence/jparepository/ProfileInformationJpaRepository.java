package com.manage.freelancer.infrastructure.persistence.jparepository;

import com.manage.freelancer.infrastructure.persistence.entityDTO.ProfileInformationDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProfileInformationJpaRepository extends JpaRepository<ProfileInformationDTO, Long> {
    Optional<ProfileInformationDTO> findByPhoneNumber(String phoneNumber);
    @Query("SELECT p FROM ProfileInformationDTO p WHERE p.user.id = :userId")
    Optional<ProfileInformationDTO> findByUserId(@Param("userId") Long userId);

}