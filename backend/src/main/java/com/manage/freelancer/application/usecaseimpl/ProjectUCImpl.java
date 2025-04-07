/*
package com.manage.freelancer.application.usecaseimpl;

import com.manage.freelancer.application.usecase.ProjectUC;
import com.manage.freelancer.domain.entity.Project;
import com.manage.freelancer.infrastructure.persistence.entityDTO.ProjectDTO;
import com.manage.freelancer.infrastructure.persistence.mapper.CategoryMapper;
import com.manage.freelancer.infrastructure.persistence.mapper.ProjectMapper;
import com.manage.freelancer.infrastructure.persistence.repository.ProjectRepo;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class ProjectUCImpl implements ProjectUC {
    private final ProjectRepo projectRepo;
    private final ProjectMapper projectMapper;
    private final CategoryMapper categoryMapper;

    @Override
    public List<ProjectDTO> getAllProjects() {
        return projectRepo.findAll();
    }

    @Override
    public Project findById(Long id) {
        ProjectDTO dto = projectRepo.findById(id); // اصلاح‌شده
        return projectMapper.toDomain(dto);
    }



    @Override
    public ProjectDTO createProject(ProjectDTO projectDTO) {
        return projectRepo.save(projectDTO);
    }

    @Override
    public ProjectDTO updateProject(ProjectDTO projectDTO) {
        return projectRepo.update(projectDTO);
    }

    @Override
    public void deleteProject(Long id) {
        projectRepo.deleteById(id);
    }

    @Override
    public ProjectDTO getProjectBySubject(String subject) {
        List<ProjectDTO> projects = projectRepo.findByProjectName(subject);
        return projects.isEmpty() ? null : projects.get(0);
    }

    @Override
    public List<Project> getProjectBySkills(String skills) {
        return projectRepo.findBySkills(skills);
    }

    @Override
    public ProjectDTO getProjectByCategory(String category) {
        return projectRepo.findByCategory(category);
    }

    @Override
    public List<ProjectDTO> getProjectByEmployerId(String employerId) {
        try {
            Long id = Long.parseLong(employerId);
            return projectRepo.findByEmployerId(id);
        } catch (NumberFormatException e) {
            return List.of();
        }
    }
}*/
