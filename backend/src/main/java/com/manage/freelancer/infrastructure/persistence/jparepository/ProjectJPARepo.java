package com.manage.freelancer.infrastructure.persistence.jparepository;

import com.manage.freelancer.AAA.infrastructure.entity.UserDTO;
import com.manage.freelancer.infrastructure.persistence.entityDTO.CategoryDTO;
import com.manage.freelancer.infrastructure.persistence.entityDTO.ProjectDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ProjectJPARepo extends JpaRepository<ProjectDTO, Long> {

    // بارگذاری روابط همراه با استفاده از EntityGraph برای متد findById
    @EntityGraph(attributePaths = {"skills", "category", "employerId"})
    Optional<ProjectDTO> findById(Long id);

    @Query("SELECT p FROM ProjectDTO p JOIN p.skills s WHERE LOWER(s.name) LIKE LOWER(CONCAT('%', :skillName, '%'))")
    List<ProjectDTO> findBySkillNameContainingIgnoreCase(@Param("skillName") String skillName);

    @Query("SELECT DISTINCT p FROM ProjectDTO p " +
            "LEFT JOIN FETCH p.skills " +
            "LEFT JOIN FETCH p.category " +
            "LEFT JOIN FETCH p.employerId " +
            "WHERE p.id = :id")
    Optional<ProjectDTO> findByIdWithRelations(@Param("id") Long id);

    @Query("SELECT p FROM ProjectDTO p WHERE LOWER(p.subject) LIKE LOWER(CONCAT('%', :projectName, '%'))")
    List<ProjectDTO> findBySubjectContainingIgnoreCase(@Param("projectName") String projectName);

    List<ProjectDTO> findByCategory(CategoryDTO category);

    @EntityGraph(attributePaths = {"skills", "category", "employerId"})
    List<ProjectDTO> findByEmployerId_Id(Long employerId);

    // اضافه کردن متد صفحه‌بندی برای دریافت پروژه‌ها
    @EntityGraph(attributePaths = {"skills", "category", "employerId"})
    Page<ProjectDTO> findAll(Pageable pageable);

    Page<ProjectDTO> findByActive(boolean active, Pageable pageable);

    @Query("SELECT p FROM ProjectDTO p " +
            "WHERE (:active IS NULL OR p.active = :active) " +
            "AND (:category IS NULL OR p.category.name = :category) " +
            "AND (:minPrice IS NULL OR p.priceStarted >= :minPrice) " +
            "AND (:maxPrice IS NULL OR p.priceEnded <= :maxPrice)")
    @EntityGraph(attributePaths = {"skills", "category", "employerId"})
    Page<ProjectDTO> findByFilters(
            @Param("active") Boolean active,
            @Param("category") String category,
            @Param("minPrice") Double minPrice,
            @Param("maxPrice") Double maxPrice,
            Pageable pageable);

}

