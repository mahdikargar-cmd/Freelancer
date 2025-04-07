/*
package com.manage.freelancer.infrastructure.persistence.mapper;

import com.manage.freelancer.domain.entity.Project;
import com.manage.freelancer.infrastructure.persistence.entityDTO.ProjectDTO;
import com.manage.freelancer.infrastructure.persistence.entityDTO.SkillDTO;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ProjectMapper {
    public Project toDomain(ProjectDTO projectDTO) {
        if (projectDTO == null) return null;
        return Project.builder()
                .id(projectDTO.getId())
                .subject(projectDTO.getSubject())
                .description(projectDTO.getDescription())
                .priceStarted(projectDTO.getPriceStarted())
                .priceEnded(projectDTO.getPriceEnded())
                .skills((SkillDTO) projectDTO.getSkills())
                .category(projectDTO.getCategory())
                .suggested(projectDTO.getSuggested())
                .deadline(projectDTO.getDeadline())
                .type(projectDTO.getType())
                .suggestions(projectDTO.getSuggestions())
                .createdDate(projectDTO.getCreatedDate())
                .endDate(projectDTO.getEndDate())
                .status(projectDTO.getStatus())
                .employerId(projectDTO.getEmployerId())
                .build();
    }

    public ProjectDTO toDTO(Project project) {
        if (project == null) return null;
        return ProjectDTO.builder()
                .id(project.getId())
                .subject(project.getSubject())
                .description(project.getDescription())
                .priceStarted(project.getPriceStarted())
                .priceEnded(project.getPriceEnded())
                .skills((List<SkillDTO>) project.getSkills())
                .category(project.getCategory())
                .suggested(project.getSuggested())
                .deadline(project.getDeadline())
                .type(project.getType())
                .suggestions(project.getSuggestions())
                .createdDate(project.getCreatedDate())
                .endDate(project.getEndDate())
                .status(project.getStatus())
                .employerId(project.getEmployerId())
                .build();
    }

}
*/
