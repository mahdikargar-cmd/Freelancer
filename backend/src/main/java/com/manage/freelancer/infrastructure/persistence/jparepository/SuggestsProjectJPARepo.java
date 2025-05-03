package com.manage.freelancer.infrastructure.persistence.jparepository;

import com.manage.freelancer.infrastructure.persistence.entityDTO.SuggestProjectDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface SuggestsProjectJPARepo extends JpaRepository<SuggestProjectDTO, Long> {
    @Query("SELECT s FROM SuggestProjectDTO s WHERE s.projectId.id = :projectId")
    List<SuggestProjectDTO> findByProjectId(@Param("projectId") Long projectId);
    List<SuggestProjectDTO> findByFreelancerId_Id(Long freelancerId);
}
