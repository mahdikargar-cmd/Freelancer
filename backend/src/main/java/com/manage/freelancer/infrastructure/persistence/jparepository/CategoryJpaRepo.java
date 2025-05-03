package com.manage.freelancer.infrastructure.persistence.jparepository;

import com.manage.freelancer.infrastructure.persistence.entityDTO.CategoryDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CategoryJpaRepo extends JpaRepository<CategoryDTO, Long> {

    @Query("SELECT c FROM CategoryDTO c WHERE c.id = :id")
    CategoryDTO findByIdWithDetails(@Param("id") Long id);

    Optional<CategoryDTO> findByName(String name);
    List<CategoryDTO> findByParentCategory(CategoryDTO parentCategoryDTO);

    CategoryDTO findByNameIgnoreCase(String name);
}