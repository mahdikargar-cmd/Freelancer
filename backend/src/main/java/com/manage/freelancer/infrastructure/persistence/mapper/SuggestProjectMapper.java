package com.manage.freelancer.infrastructure.persistence.mapper;

import com.manage.freelancer.AAA.domain.model.User;
import com.manage.freelancer.AAA.infrastructure.UserMapper;
import com.manage.freelancer.AAA.infrastructure.entity.UserDTO;
import com.manage.freelancer.domain.entity.Project;
import com.manage.freelancer.domain.entity.SuggestProject;
import com.manage.freelancer.infrastructure.persistence.entityDTO.ProjectDTO;
import com.manage.freelancer.infrastructure.persistence.entityDTO.SuggestProjectDTO;
import lombok.Data;
import org.springframework.stereotype.Component;

@Data
@Component
public class SuggestProjectMapper {
    private final UserMapper userMapper;
    private final ProjectMapper projectMapper;

    public SuggestProjectDTO toDTO(SuggestProject suggestProject) {
        if (suggestProject == null) return null;
        UserDTO freelancer = userMapper.toDTO(suggestProject.getFreelancerId());
        ProjectDTO projectId = projectMapper.toDTO(suggestProject.getProjectId());
        return SuggestProjectDTO.builder()
                .id(suggestProject.getId())
                .projectId(projectId)
                .freelancerId(freelancer)
                .title(suggestProject.getTitle())
                .content(suggestProject.getContent())
                .proposedBudget(suggestProject.getProposedBudget())
                .estimatedDuration(suggestProject.getEstimatedDuration())
                .submittedAt(suggestProject.getSubmittedAt())
                .status(suggestProject.getStatus())
                .milestones(suggestProject.getMilestones())
                .build();
    }

    public SuggestProject toDomain(SuggestProjectDTO suggestProjectDTO) {
        if (suggestProjectDTO == null) return null;
        User freelancer = userMapper.toDomain(suggestProjectDTO.getFreelancerId());
        Project projectId = projectMapper.toDomain(suggestProjectDTO.getProjectId());

        return SuggestProject.builder()
                .id(suggestProjectDTO.getId())
                .projectId(projectId)
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
}
