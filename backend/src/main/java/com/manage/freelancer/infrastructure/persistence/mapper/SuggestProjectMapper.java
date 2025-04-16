package com.manage.freelancer.infrastructure.persistence.mapper;

import com.manage.freelancer.AAA.domain.model.User;
import com.manage.freelancer.AAA.infrastructure.UserMapper;
import com.manage.freelancer.AAA.infrastructure.entity.UserDTO;
import com.manage.freelancer.domain.entity.Project;
import com.manage.freelancer.domain.entity.ProjectStatus;  // Add this import if needed
import com.manage.freelancer.domain.entity.SuggestProject;
import com.manage.freelancer.infrastructure.persistence.entityDTO.ProjectDTO;
import com.manage.freelancer.infrastructure.persistence.entityDTO.SuggestProjectDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class SuggestProjectMapper {
    private final UserMapper userMapper;

    public SuggestProject toDomain(SuggestProjectDTO suggestProjectDTO) {
        if (suggestProjectDTO == null) return null;

        Project project = null;
        if (suggestProjectDTO.getProjectId() != null) {
            project = Project.builder()
                    .id(suggestProjectDTO.getProjectId().getId())
                    .subject(suggestProjectDTO.getProjectId().getSubject())
                    .description(suggestProjectDTO.getProjectId().getDescription())
                    .priceStarted(suggestProjectDTO.getProjectId().getPriceStarted())
                    .priceEnded(suggestProjectDTO.getProjectId().getPriceEnded())
                    .deadline(suggestProjectDTO.getProjectId().getDeadline())
                    .suggested(suggestProjectDTO.getProjectId().getSuggested())
                    .active(suggestProjectDTO.getProjectId().isActive())
                    .createdDate(suggestProjectDTO.getProjectId().getCreatedDate())
                    .endDate(suggestProjectDTO.getProjectId().getEndDate())
                    .status(ProjectStatus.valueOf(suggestProjectDTO.getProjectId().getStatus()))  // Convert String to ProjectStatus enum
                    .build();
        }

        User freelancer = userMapper.toDomain(suggestProjectDTO.getFreelancerId());

        return SuggestProject.builder()
                .id(suggestProjectDTO.getId())
                .projectId(project)
                .freelancerId(freelancer)
                .title(suggestProjectDTO.getTitle())
                .content(suggestProjectDTO.getContent())
                .proposedBudget(suggestProjectDTO.getProposedBudget())
                .estimatedDuration(suggestProjectDTO.getEstimatedDuration())
                .submittedAt(suggestProjectDTO.getSubmittedAt())
                .status(suggestProjectDTO.getStatus())
                .milestones(suggestProjectDTO.getMilestones())
                .build();
    }

    public SuggestProjectDTO toDTO(SuggestProject suggestProject) {
        if (suggestProject == null) return null;

        ProjectDTO projectDTO = null;
        if (suggestProject.getProjectId() != null) {
            projectDTO = ProjectDTO.builder()
                    .id(suggestProject.getProjectId().getId())
                    .subject(suggestProject.getProjectId().getSubject())
                    .description(suggestProject.getProjectId().getDescription())
                    .priceStarted(suggestProject.getProjectId().getPriceStarted())
                    .priceEnded(suggestProject.getProjectId().getPriceEnded())
                    .deadline(suggestProject.getProjectId().getDeadline())
                    .suggested(suggestProject.getProjectId().getSuggested())
                    .active(suggestProject.getProjectId().isActive())
                    .createdDate(suggestProject.getProjectId().getCreatedDate())
                    .endDate(suggestProject.getProjectId().getEndDate())
                    .status(suggestProject.getProjectId().getStatus().toString())  // Convert ProjectStatus enum to String
                    .build();
        }

        UserDTO freelancerDTO = userMapper.toDTO(suggestProject.getFreelancerId());

        return SuggestProjectDTO.builder()
                .id(suggestProject.getId())
                .projectId(projectDTO)
                .freelancerId(freelancerDTO)
                .title(suggestProject.getTitle())
                .content(suggestProject.getContent())
                .proposedBudget(suggestProject.getProposedBudget())
                .estimatedDuration(suggestProject.getEstimatedDuration())
                .submittedAt(suggestProject.getSubmittedAt())
                .status(suggestProject.getStatus())
                .milestones(suggestProject.getMilestones())
                .build();
    }
}