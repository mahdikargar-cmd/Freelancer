package com.manage.freelancer.application.usecaseimpl;

import com.manage.freelancer.application.usecase.CategoryUc;
import com.manage.freelancer.domain.entity.Category;
import com.manage.freelancer.infrastructure.persistence.entityDTO.CategoryDTO;
import com.manage.freelancer.infrastructure.persistence.mapper.CategoryMapper;
import com.manage.freelancer.infrastructure.persistence.repository.CategoryRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategoryUcImpl implements CategoryUc {
    private final CategoryRepo categoryRepo;
    private final CategoryMapper categoryMapper;

    public List<CategoryDTO> getAllCategory() {
        return categoryRepo.findAll().stream()
                .map(categoryMapper::toDTO)
                .collect(Collectors.toList());
    }

    public CategoryDTO getCategoryByName(String name) {
        Optional<Category> category = categoryRepo.findByName(name);
        return category.map(categoryMapper::toDTO).orElse(null);
    }

    public CategoryDTO createCategory(CategoryDTO categoryDTO) {
        Category savedCategory = categoryRepo.save(categoryDTO);
        return categoryMapper.toDTO(savedCategory);
    }

    public CategoryDTO updateCategory(CategoryDTO categoryDTO) {
        Category updatedCategory = categoryRepo.update(categoryDTO);
        return categoryMapper.toDTO(updatedCategory);
    }

    public CategoryDTO findByParentCategory(CategoryDTO categoryDTO) {
        Category category = categoryRepo.findByParentCategory(categoryDTO);
        return categoryMapper.toDTO(category);
    }

    public CategoryDTO deleteCategoryByParentCategory(CategoryDTO categoryDTO) {
        Category category = categoryRepo.findByParentCategory(categoryDTO);
        if (category != null) {
            categoryRepo.delete(categoryMapper.toDTO(category));
            return categoryMapper.toDTO(category);
        }
        return null;
    }

    public CategoryDTO deleteCategoryById(Long id) {
        Category deletedCategory = categoryRepo.deleteById(id);
        return categoryMapper.toDTO(deletedCategory);
    }
}