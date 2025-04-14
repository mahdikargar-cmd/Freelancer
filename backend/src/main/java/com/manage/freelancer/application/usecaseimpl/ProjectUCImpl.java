package com.manage.freelancer.application.usecaseimpl;

import com.manage.freelancer.AAA.infrastructure.entity.UserDTO;
import com.manage.freelancer.AAA.infrastructure.repository.UserRepository;
import com.manage.freelancer.application.usecase.ProjectUC;
import com.manage.freelancer.domain.entity.Project;
import com.manage.freelancer.infrastructure.persistence.entityDTO.CategoryDTO;
import com.manage.freelancer.infrastructure.persistence.entityDTO.ProjectDTO;
import com.manage.freelancer.infrastructure.persistence.entityDTO.SkillDTO;
import com.manage.freelancer.infrastructure.persistence.jparepository.CategoryJpaRepo;
import com.manage.freelancer.infrastructure.persistence.mapper.ProjectMapper;
import com.manage.freelancer.infrastructure.persistence.repository.ProjectRepo;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ProjectUCImpl implements ProjectUC {
    private final ProjectRepo projectRepo;
    private final ProjectMapper projectMapper;
    private final SkillUCImpl skillUC;
    private final CategoryJpaRepo categoryRepo;
    private final UserRepository userRepo;

    // نسخه صفحه‌بندی متد دریافت پروژه‌ها
    @Override
    public Page<ProjectDTO> getAllProjects(Pageable pageable) {
        return projectRepo.findAll(pageable);
    }


    @Override
    public ProjectDTO getProjectById(Long id) {
        return projectRepo.findById(id);
    }

    @Override
    public Project findById(Long id) {
        return projectMapper.toDomain(getProjectById(id));
    }

    @Override
    public ProjectDTO createProject(ProjectDTO projectDTO) {
        // Get authenticated user from SecurityContext
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated() || authentication.getPrincipal().equals("anonymousUser")) {
            throw new IllegalStateException("User must be authenticated to create a project");
        }

        // Assume the principal contains the UserDTO or user ID
        Long employerId;
        if (authentication.getPrincipal() instanceof UserDTO) {
            employerId = ((UserDTO) authentication.getPrincipal()).getId();
        } else {
            // If principal is a String (e.g., username), fetch user by username
            String username = authentication.getName();
            UserDTO user = userRepo.findByUsername(username)
                    .orElseThrow(() -> new IllegalArgumentException("Authenticated user not found"));
            employerId = user.getId();
        }

        // Set employerId in projectDTO
        UserDTO fullUser = userRepo.findById(employerId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid employer ID"));
        projectDTO.setEmployerId(fullUser);

        // Validate and set skills
        if (projectDTO.getSkills() != null && !projectDTO.getSkills().isEmpty()) {
            List<Long> skillIds = projectDTO.getSkills()
                    .stream()
                    .map(SkillDTO::getId)
                    .collect(Collectors.toList());
            List<SkillDTO> dbSkills = skillUC.findByIds(skillIds);
            projectDTO.setSkills(dbSkills);
        }

        // Validate and set category
        if (projectDTO.getCategory() != null && projectDTO.getCategory().getId() != null) {
            CategoryDTO fullCategory = categoryRepo.findByIdWithDetails(projectDTO.getCategory().getId());
            if (fullCategory == null) {
                throw new IllegalArgumentException("Invalid category ID");
            }
            projectDTO.setCategory(fullCategory);
        } else {
            throw new IllegalArgumentException("Category is required");
        }

        return projectRepo.save(projectDTO);
    }

    @Override
    public List<ProjectDTO> getProjectByEmployerId(Long employerId) {
        List<ProjectDTO> projects = projectRepo.findByEmployerId(employerId);
        if (projects == null || projects.isEmpty()) {
            return Collections.emptyList();
        }
        return projects;
    }

    @Override
    public ProjectDTO updateProject(ProjectDTO projectDTO) {
        if (projectDTO.getSkills() != null && !projectDTO.getSkills().isEmpty()) {
            List<Long> skillIds = projectDTO.getSkills()
                    .stream()
                    .map(SkillDTO::getId)
                    .collect(Collectors.toList());
            List<SkillDTO> dbSkills = skillUC.findByIds(skillIds);
            projectDTO.setSkills(dbSkills);
        }
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
    public List<ProjectDTO> getProjectBySkills(String skills) {
        return projectRepo.findBySkills(skills);
    }

    @Override
    public ProjectDTO getProjectByCategory(String category) {
        return projectRepo.findByCategory(category);
    }



}
