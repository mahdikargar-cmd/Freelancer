package com.manage.freelancer.application.usecase;

import com.manage.freelancer.domain.entity.Project;
import com.manage.freelancer.infrastructure.persistence.entityDTO.ProjectDTO;

import java.util.List;

public interface ProjectUC {
    List<ProjectDTO> getAllProjects();
    ProjectDTO getProjectById(Long id);
    Project findById(Long id);
    ProjectDTO createProject(ProjectDTO projectDTO);
    ProjectDTO updateProject(ProjectDTO projectDTO);
    void deleteProject(Long id);
    ProjectDTO getProjectBySubject(String subject);
    List<ProjectDTO> getProjectBySkills(String skills);
    ProjectDTO getProjectByCategory(String category);
    List<ProjectDTO> getProjectByEmployerId(String employerId);
}
