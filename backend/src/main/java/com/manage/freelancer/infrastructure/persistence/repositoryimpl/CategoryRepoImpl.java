package com.manage.freelancer.infrastructure.persistence.repositoryimpl;

import com.manage.freelancer.domain.entity.Category;
import com.manage.freelancer.infrastructure.persistence.entityDTO.CategoryDTO;
import com.manage.freelancer.infrastructure.persistence.jparepository.CategoryJpaRepo;
import com.manage.freelancer.infrastructure.persistence.mapper.CategoryMapper;
import com.manage.freelancer.infrastructure.persistence.repository.CategoryRepo;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Repository
public class CategoryRepoImpl implements CategoryRepo {
    private final CategoryJpaRepo categoryJpaRepo;
    private final CategoryMapper categoryMapper;

    public CategoryRepoImpl(CategoryJpaRepo categoryJpaRepo, CategoryMapper categoryMapper) {
        this.categoryJpaRepo = categoryJpaRepo;
        this.categoryMapper = categoryMapper;
    }

    @Override
    public Optional<Category> findByName(String name) {
        return categoryJpaRepo.findByName(name)
                .map(categoryMapper::toDomain);
    }

    @Override
    public List<Category> findAll() {
        return categoryJpaRepo.findAll().stream()
                .map(categoryMapper::toDomain)
                .collect(Collectors.toList());
    }

    @Override
    public Category save(CategoryDTO categoryDTO) {
        CategoryDTO savedDTO = categoryJpaRepo.save(categoryDTO);
        return categoryMapper.toDomain(savedDTO);
    }

    @Override
    public Category update(CategoryDTO categoryDTO) {
        CategoryDTO updatedDTO = categoryJpaRepo.save(categoryDTO);
        return categoryMapper.toDomain(updatedDTO);
    }

    @Override
    public void delete(CategoryDTO categoryDTO) {
        categoryJpaRepo.delete(categoryDTO);
    }

    @Override
    public Category findByParentCategory(CategoryDTO parentCategoryDTO) {
        List<CategoryDTO> categories = categoryJpaRepo.findByParentCategory(parentCategoryDTO);
        return categories.isEmpty() ? null : categoryMapper.toDomain(categories.get(0));
    }

    @Override
    public Category deleteById(Long id) {
        Optional<CategoryDTO> categoryDTO = categoryJpaRepo.findById(id);
        if (categoryDTO.isPresent()) {
            categoryJpaRepo.deleteById(id);
            return categoryMapper.toDomain(categoryDTO.get());
        }
        return null;
    }
}