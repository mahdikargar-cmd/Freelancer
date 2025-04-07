/*
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
    private final ProjectMapper projectMapper;
    private final ProjectJPARepo projectJPARepo;
    private CategoryJpaRepo categoryJPARepo; // اضافه کن اگر نداری


    @Override
    public List<ProjectDTO> findAll() {
        return projectJPARepo.findAll().stream()
                .collect(Collectors.toList());
    }

    @Override
    public List<ProjectDTO> findByProjectName(String projectName) {
        return projectJPARepo.findBySubjectContainingIgnoreCase(projectName);
    }

    @Override
    public ProjectDTO findById(Long id) {
        return projectJPARepo.findById(id).orElse(null);
    }

    @Override
    public ProjectDTO save(ProjectDTO projectDTO) {
        return projectJPARepo.save(projectDTO);
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
    public List<Project> findBySkills(String skills) {
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
}*/
