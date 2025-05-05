        package com.manage.freelancer.infrastructure.persistence.mapper;

import com.manage.freelancer.AAA.domain.model.User;
import com.manage.freelancer.AAA.infrastructure.UserMapper;
import com.manage.freelancer.AAA.infrastructure.entity.UserDTO;
import com.manage.freelancer.domain.entity.*;
import com.manage.freelancer.infrastructure.persistence.entityDTO.ProjectDTO;
import com.manage.freelancer.infrastructure.persistence.entityDTO.SkillDTO;
import com.manage.freelancer.infrastructure.persistence.entityDTO.CategoryDTO;
import com.manage.freelancer.infrastructure.persistence.entityDTO.SuggestProjectDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class ProjectMapper {
    private final SkillsMapper skillsMapper;
    private final UserMapper userMapper;
    private final CategoryMapper categoryMapper;

    public Project toDomain(ProjectDTO projectDTO) {
        if (projectDTO == null) return null;

        List<Skills> skillsDomain = null;
        if (projectDTO.getSkills() != null) {
            skillsDomain = projectDTO.getSkills()
                    .stream()
                    .map(skillsMapper::toDomain)
                    .collect(Collectors.toList());
        }

        List<User> suggestionsDomain = null;
        if (projectDTO.getSuggestions() != null) {
            suggestionsDomain = projectDTO.getSuggestions()
                    .stream()
                    .map(userMapper::toDomain)
                    .collect(Collectors.toList());
        }

        User employer = userMapper.toDomain(projectDTO.getEmployerId());
        Category category = categoryMapper.toDomain(projectDTO.getCategory());

        return Project.builder()
                .id(projectDTO.getId())
                .subject(projectDTO.getSubject())
                .description(projectDTO.getDescription())
                .priceStarted(projectDTO.getPriceStarted() != null ? projectDTO.getPriceStarted() : 0.0)
                .priceEnded(projectDTO.getPriceEnded() != null ? projectDTO.getPriceEnded() : 0.0)
                .deadline(projectDTO.getDeadline() != null ? projectDTO.getDeadline() : 0)
                .suggested(projectDTO.getSuggested())
                .active(projectDTO.isActive())
                .suggestions(suggestionsDomain)
                .skills(skillsDomain)
                .category(category)
                .employerId(employer)
                .createdDate(projectDTO.getCreatedDate())
                .endDate(projectDTO.getEndDate())
                .status(projectDTO.getStatus() != null ? ProjectStatus.valueOf(projectDTO.getStatus()) : null)
                .type(projectDTO.getType() != null ? ProjectType.valueOf(projectDTO.getType()) : null)
                .build();
    }

    public ProjectDTO toDTO(Project project) {
        if (project == null) return null;

        List<SkillDTO> skillsDTO = null;
        if (project.getSkills() != null) {
            skillsDTO = project.getSkills()
                    .stream()
                    .map(skillsMapper::toDTO)
                    .collect(Collectors.toList());
        }

        List<UserDTO> suggestionsDTO = null;
        if (project.getSuggestions() != null) {
            suggestionsDTO = project.getSuggestions()
                    .stream()
                    .map(userMapper::toDTO)
                    .collect(Collectors.toList());
        }

        UserDTO employerDTO = userMapper.toDTO(project.getEmployerId());
        CategoryDTO categoryDTO = categoryMapper.toDTO(project.getCategory());

        return ProjectDTO.builder()
                .id(project.getId())
                .subject(project.getSubject())
                .description(project.getDescription())
                .priceStarted(project.getPriceStarted())
                .priceEnded(project.getPriceEnded())
                .deadline(project.getDeadline())
                .active(project.isActive())
                .suggested(project.getSuggested())
                .suggestions(suggestionsDTO)
                .skills(skillsDTO)
                .category(categoryDTO)
                .employerId(employerDTO)
                .createdDate(project.getCreatedDate())
                .endDate(project.getEndDate())
                .status(project.getStatus() != null ? project.getStatus().name() : null)
                .type(project.getType() != null ? project.getType().name() : null)
                .build();
    }
}