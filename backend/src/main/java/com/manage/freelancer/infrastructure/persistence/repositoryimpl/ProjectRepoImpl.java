package com.manage.freelancer.infrastructure.persistence.repositoryimpl;

import com.manage.freelancer.domain.entity.Project;
import com.manage.freelancer.infrastructure.persistence.entityDTO.CategoryDTO;
import com.manage.freelancer.infrastructure.persistence.entityDTO.ProjectDTO;
import com.manage.freelancer.infrastructure.persistence.jparepository.CategoryJpaRepo;
import com.manage.freelancer.infrastructure.persistence.jparepository.ProjectJPARepo;
import com.manage.freelancer.infrastructure.persistence.mapper.ProjectMapper;
import com.manage.freelancer.infrastructure.persistence.repository.ProjectRepo;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.stream.Collectors;

@Repository
@AllArgsConstructor
public class ProjectRepoImpl implements ProjectRepo {
    private final ProjectJPARepo projectJPARepo;
    private CategoryJpaRepo categoryJPARepo; // اضافه کن اگر نداری
    private final ProjectMapper projectMapper;

    @Override
    public List<ProjectDTO> findAll() {
        return projectJPARepo.findAll().stream()
                .map(this::ensureRelationsLoaded)
                .collect(Collectors.toList());
    }
    private ProjectDTO ensureRelationsLoaded(ProjectDTO project) {
        if (project.getId() > 0) {
            // Force reload the entity with all relations
            return projectJPARepo.findByIdWithRelations(project.getId()).orElse(project);
        }
        return project;
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
        // After saving, load the full object with relationships
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
