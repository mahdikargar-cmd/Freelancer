package com.manage.freelancer.infrastructure.persistence.repositoryimpl;

import com.manage.freelancer.infrastructure.persistence.entityDTO.CategoryDTO;
import com.manage.freelancer.infrastructure.persistence.entityDTO.ProjectDTO;
import com.manage.freelancer.infrastructure.persistence.jparepository.CategoryJpaRepo;
import com.manage.freelancer.infrastructure.persistence.jparepository.ProjectJPARepo;
import com.manage.freelancer.infrastructure.persistence.repository.ProjectRepo;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@AllArgsConstructor
public class ProjectRepoImpl implements ProjectRepo {
    private final ProjectJPARepo projectJPARepo;
    private CategoryJpaRepo categoryJPARepo;

    @Override
    public Page<ProjectDTO> findAll(Pageable pageable) {
        return projectJPARepo.findAll(pageable);
    }

    @Override
    public Page<ProjectDTO> findByActive(boolean active, Pageable pageable) {
        return projectJPARepo.findByActive(active, pageable);
    }

    @Override
    public Page<ProjectDTO> findByFilters(Boolean active, String category, Double minPrice, Double maxPrice, Pageable pageable) {
        return projectJPARepo.findByFilters(active, category, minPrice, maxPrice, pageable);
    }

    @Override
    public List<ProjectDTO> findByProjectName(String projectName) {
        return projectJPARepo.findBySubjectContainingIgnoreCase(projectName);
    }

    @Override
    public ProjectDTO findById(Long id) {
        return projectJPARepo.findByIdWithRelations(id).orElse(null);
    }

    @Override
    public ProjectDTO save(ProjectDTO projectDTO) {
        ProjectDTO saved = projectJPARepo.save(projectDTO);
        return projectJPARepo.findByIdWithRelations(saved.getId()).orElse(saved);
    }

    @Override
    public void deleteById(Long id) {
        projectJPARepo.deleteById(id);
    }

    @Override
    public ProjectDTO update(ProjectDTO projectDTO) {
        return projectJPARepo.save(projectDTO);
    }

    @Override
    public List<ProjectDTO> findBySkills(String skills) {
        return projectJPARepo.findBySkillNameContainingIgnoreCase(skills);
    }

    @Override
    public ProjectDTO findByCategory(String categoryStr) {
        CategoryDTO categoryDTO = categoryJPARepo.findByNameIgnoreCase(categoryStr);
        if (categoryDTO == null) return null;
        List<ProjectDTO> projects = projectJPARepo.findByCategory(categoryDTO);
        return projects.isEmpty() ? null : projects.get(0);
    }
    @Override
    public List<ProjectDTO> findByEmployerId(Long employerId) {
        return projectJPARepo.findByEmployerId_Id(employerId);
    }

}
