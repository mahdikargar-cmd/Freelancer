package com.manage.freelancer.application.usecase;

import com.manage.freelancer.domain.entity.Project;
import com.manage.freelancer.infrastructure.persistence.entityDTO.ProjectDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ProjectUC {
    Page<ProjectDTO> getAllProjects(Pageable pageable);
    ProjectDTO getProjectById(Long id);
    Project findById(Long id);
    ProjectDTO createProject(ProjectDTO projectDTO);
    ProjectDTO updateProject(ProjectDTO projectDTO);
    ProjectDTO addSuggestion(Long projectId, Long freelancerId); // New method for suggestions
    void deleteProject(Long id);
    ProjectDTO getProjectBySubject(String subject);
    List<ProjectDTO> getProjectBySkills(String skills);
    ProjectDTO getProjectByCategory(String category);
    List<ProjectDTO> getProjectByEmployerId(Long employerId);
}