package com.manage.freelancer.application.usecase;

import com.manage.freelancer.infrastructure.persistence.entityDTO.CategoryDTO;

import java.util.List;

public interface CategoryUc {
    List<CategoryDTO> getAllCategory();
    CategoryDTO getCategoryByName(String categoryName);
    CategoryDTO createCategory(CategoryDTO categoryDTO);
    CategoryDTO updateCategory(CategoryDTO categoryDTO);
    CategoryDTO findByParentCategory(CategoryDTO categoryDTO);
    CategoryDTO deleteCategoryById(Long id);
    CategoryDTO deleteCategoryByParentCategory(CategoryDTO categoryDTO);




}
