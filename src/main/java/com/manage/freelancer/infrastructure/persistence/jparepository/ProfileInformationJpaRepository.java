package com.manage.freelancer.infrastructure.persistence.jparepository;

import com.manage.freelancer.infrastructure.persistence.entityDTO.ProfileInformationDTO;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProfileInformationJpaRepository extends JpaRepository<ProfileInformationDTO, Long> {


}
