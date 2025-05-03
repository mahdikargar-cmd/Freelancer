package com.manage.freelancer.presentation.controller;

import com.manage.freelancer.application.usecaseimpl.CategoryUcImpl;
import com.manage.freelancer.infrastructure.persistence.entityDTO.CategoryDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/app")
@RequiredArgsConstructor
public class CategoryController {
    private final CategoryUcImpl categoryUc;

    @GetMapping("/getCategories")
    public ResponseEntity<List<CategoryDTO>> getCategories() {
        return ResponseEntity.ok(categoryUc.getAllCategory());
    }

    @GetMapping("/getByName")
    public ResponseEntity<CategoryDTO> getCategoryByName(@RequestParam String name) {
        CategoryDTO category = categoryUc.getCategoryByName(name);
        return category != null ? ResponseEntity.ok(category) : ResponseEntity.notFound().build();
    }

    @PostMapping("/createCategory")
    public ResponseEntity<CategoryDTO> createCategory(@RequestBody CategoryDTO categoryDTO) {
        return ResponseEntity.ok(categoryUc.createCategory(categoryDTO));
    }

    @PutMapping("/updateCategory")
    public ResponseEntity<CategoryDTO> updateCategory(@RequestBody CategoryDTO categoryDTO) {
        return ResponseEntity.ok(categoryUc.updateCategory(categoryDTO));
    }

    @GetMapping("/getByParentCategory")
    public ResponseEntity<CategoryDTO> findByParentCategory(@RequestBody CategoryDTO categoryDTO) {
        CategoryDTO category = categoryUc.findByParentCategory(categoryDTO);
        return category != null ? ResponseEntity.ok(category) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/delParentCategory")
    public ResponseEntity<CategoryDTO> deleteCategoryByParent(@RequestBody CategoryDTO categoryDTO) {
        CategoryDTO deletedCategory = categoryUc.deleteCategoryByParentCategory(categoryDTO);
        return deletedCategory != null ? ResponseEntity.ok(deletedCategory) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/delById/{id}")
    public ResponseEntity<CategoryDTO> deleteCategoryById(@PathVariable Long id) {
        CategoryDTO deletedCategory = categoryUc.deleteCategoryById(id);
        return deletedCategory != null ? ResponseEntity.ok(deletedCategory) : ResponseEntity.notFound().build();
    }
}