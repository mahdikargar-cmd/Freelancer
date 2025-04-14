package com.manage.freelancer.infrastructure.persistence.mapper;

import com.manage.freelancer.AAA.domain.model.User;
import com.manage.freelancer.AAA.infrastructure.UserMapper;
import com.manage.freelancer.AAA.infrastructure.entity.UserDTO;
import com.manage.freelancer.domain.entity.Project;
import com.manage.freelancer.domain.entity.Skills;
import com.manage.freelancer.domain.entity.Category;
import com.manage.freelancer.infrastructure.persistence.entityDTO.ProjectDTO;
import com.manage.freelancer.infrastructure.persistence.entityDTO.SkillDTO;
import com.manage.freelancer.infrastructure.persistence.entityDTO.CategoryDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

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

        User employer = userMapper.toDomain(projectDTO.getEmployerId());
        Category category = categoryMapper.toDomain(projectDTO.getCategory());

        return Project.builder()
                .id(projectDTO.getId())
                .subject(projectDTO.getSubject())
                .description(projectDTO.getDescription())
                .priceStarted(projectDTO.getPriceStarted())
                .priceEnded(projectDTO.getPriceEnded())
                .deadline(projectDTO.getDeadline())
                .suggested(projectDTO.getSuggested())
                .active(projectDTO.isActive())
                .suggestions(projectDTO.getSuggestions())
                .skills(skillsDomain)
                .category(category)
                .employerId(employer)
                .createdDate(projectDTO.getCreatedDate()) // اضافه کردن
                .endDate(projectDTO.getEndDate()) // اضافه کردن
                .status(projectDTO.getStatus())
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
                .suggestions(project.getSuggestions())
                .skills(skillsDTO)
                .category(categoryDTO)
                .employerId(employerDTO)
                .createdDate(project.getCreatedDate()) // اضافه کردن
                .endDate(project.getEndDate()) // اضافه کردن
                .status(project.getStatus())
                .build();
    }
}