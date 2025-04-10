package com.manage.freelancer.infrastructure.persistence.jparepository;

import com.manage.freelancer.infrastructure.persistence.entityDTO.SuggestProjectDTO;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SuggestsProjectJPARepo extends JpaRepository<SuggestProjectDTO, Long> {

}
