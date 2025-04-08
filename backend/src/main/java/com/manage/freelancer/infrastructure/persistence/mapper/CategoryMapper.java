package com.manage.freelancer.infrastructure.persistence.mapper;

import com.manage.freelancer.domain.entity.Category;
import com.manage.freelancer.infrastructure.persistence.entityDTO.CategoryDTO;
import org.springframework.stereotype.Component;

@Component
public class CategoryMapper {


    public Category toDomain(CategoryDTO categoryDTO) {
        if (categoryDTO == null) return null;

        return Category.builder()
                .id(categoryDTO.getId())
                .name(categoryDTO.getName() != null ? categoryDTO.getName() : "Unknown")  // مقدار پیش‌فرض
                .parentCategory(toDomain(categoryDTO.getParentCategory()))
                .build();
    }

    public CategoryDTO toDTO(Category category) {
        if (category == null) return null;
        return CategoryDTO.builder()
                .id(category.getId())
                .name(category.getName())
                .parentCategory(toDTO(category.getParentCategory()))
                .build();
    }
}
