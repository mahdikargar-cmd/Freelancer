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
import com.manage.freelancer.infrastructure.persistence.repository.CategoryRepo;
import com.manage.freelancer.infrastructure.persistence.repository.ProjectRepo;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

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

    @Override
    public List<ProjectDTO> getAllProjects() {
        return projectRepo.findAll();
    }

    @Override
    public ProjectDTO getProjectById(Long id) {
        return projectRepo.findById(id);
    }

    @Override
    public Project findById(Long id) {
        return projectMapper.toDomain( projectRepo.findById(id));
    }


    @Override
    public ProjectDTO createProject(ProjectDTO projectDTO) {
        // Process skills - fetch them from the database using their IDs
        if (projectDTO.getSkills() != null && !projectDTO.getSkills().isEmpty()) {
            List<Long> skillIds = projectDTO.getSkills().stream()
                    .map(SkillDTO::getId)
                    .collect(Collectors.toList());

            // Replace with actual skills from database
            List<SkillDTO> dbSkills = skillUC.findByIds(skillIds);
            projectDTO.setSkills(dbSkills);
        }
        if (projectDTO.getCategory() != null && projectDTO.getCategory().getId() != null) {
            CategoryDTO fullCategory = categoryRepo.findByIdWithDetails(projectDTO.getCategory().getId());
            if (fullCategory != null) {
                projectDTO.setCategory(fullCategory);
            }
        }

        // Load the full user if only ID is provided
        if (projectDTO.getEmployerId() != null && projectDTO.getEmployerId().getId() > 0) {
            UserDTO fullUser = userRepo.findById(projectDTO.getEmployerId().getId())
                    .orElse(projectDTO.getEmployerId());
            projectDTO.setEmployerId(fullUser);
        }
        return projectRepo.save(projectDTO);
    }

    @Override
    public ProjectDTO updateProject(ProjectDTO projectDTO) {
        // Process skills - fetch them from the database using their IDs
        if (projectDTO.getSkills() != null && !projectDTO.getSkills().isEmpty()) {
            List<Long> skillIds = projectDTO.getSkills().stream()
                    .map(SkillDTO::getId)
                    .collect(Collectors.toList());
            // Replace with actual skills from database
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

    @Override
    public List<ProjectDTO> getProjectByEmployerId(String employerId) {
        try {
            Long id = Long.parseLong(employerId);
            return projectRepo.findByEmployerId(id);
        } catch (NumberFormatException e) {
            return List.of();
        }
    }
}
