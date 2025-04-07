/*
package com.manage.freelancer.infrastructure.persistence.jparepository;

import com.manage.freelancer.domain.entity.Project;
import com.manage.freelancer.infrastructure.persistence.entityDTO.CategoryDTO;
import com.manage.freelancer.infrastructure.persistence.entityDTO.ProjectDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProjectJPARepo extends JpaRepository<ProjectDTO, Long> {
    @Query("SELECT p FROM Project p JOIN p.skills s WHERE LOWER(s.name) LIKE LOWER(CONCAT('%', :skill, '%'))")
    List<Project> findBySkillNameContainingIgnoreCase(@Param("skill") String skill);

    List<ProjectDTO> findBySubjectContainingIgnoreCase(String projectName);
    List<ProjectDTO> findByCategory(CategoryDTO category);
    List<ProjectDTO> findByEmployerId_Id(Long employerId);


}
*/
