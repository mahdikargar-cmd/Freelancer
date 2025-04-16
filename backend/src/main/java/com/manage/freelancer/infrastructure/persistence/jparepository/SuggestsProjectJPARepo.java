package com.manage.freelancer.infrastructure.persistence.jparepository;

import com.manage.freelancer.infrastructure.persistence.entityDTO.SuggestProjectDTO;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SuggestsProjectJPARepo extends JpaRepository<SuggestProjectDTO, Long> {

    List<SuggestProjectDTO> findByProjectId_Id(Long projectId);
    List<SuggestProjectDTO> findByFreelancerId_Id(Long freelancerId);
}
