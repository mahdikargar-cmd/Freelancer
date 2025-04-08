package com.manage.freelancer.infrastructure.persistence.jparepository;
import com.manage.freelancer.infrastructure.persistence.entityDTO.CategoryDTO;
import com.manage.freelancer.infrastructure.persistence.entityDTO.ProjectDTO;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ProjectJPARepo extends JpaRepository<ProjectDTO, Long> {
    @EntityGraph(attributePaths = {"skills", "category", "employerId"})
    Optional<ProjectDTO> findById(Long id);

    @Query("SELECT p FROM ProjectDTO p JOIN p.skills s WHERE LOWER(s.name) LIKE LOWER(CONCAT('%', :skillName, '%'))")
    List<ProjectDTO> findBySkillNameContainingIgnoreCase(@Param("skillName") String skillName);

    @Query("SELECT DISTINCT p FROM ProjectDTO p " +
            "LEFT JOIN FETCH p.skills s " +
            "LEFT JOIN FETCH p.category c " +
            "LEFT JOIN FETCH p.employerId e " +
            "WHERE p.id = :id")
    Optional<ProjectDTO> findByIdWithRelations(@Param("id") Long id);

    List<ProjectDTO> findBySubjectContainingIgnoreCase(@Param("projectName") String projectName);

    List<ProjectDTO> findByCategory(CategoryDTO category);

    List<ProjectDTO> findByEmployerId_Id(Long employerId);


}
