package com.manage.freelancer.infrastructure.persistence.repository;

import com.manage.freelancer.domain.entity.Category;
import com.manage.freelancer.infrastructure.persistence.entityDTO.CategoryDTO;

import java.util.List;
import java.util.Optional;

public interface CategoryRepo {
    Optional<Category> findByName(String name);
    List<Category> findAll();
    Category save(CategoryDTO categoryDTO);
    Category update(CategoryDTO categoryDTO);
    void delete(CategoryDTO categoryDTO);
    Category findByParentCategory(CategoryDTO categoryDTO);
    Category deleteById(Long id);
}