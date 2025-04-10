package com.manage.freelancer.application.usecaseimpl;

import com.manage.freelancer.AAA.infrastructure.entity.UserDTO;
import com.manage.freelancer.AAA.infrastructure.repository.UserRepository;
import com.manage.freelancer.application.usecase.SuggestProjectUC;
import com.manage.freelancer.infrastructure.persistence.entityDTO.ProjectDTO;
import com.manage.freelancer.infrastructure.persistence.entityDTO.SuggestProjectDTO;
import com.manage.freelancer.infrastructure.persistence.repository.ProjectRepo;
import com.manage.freelancer.infrastructure.persistence.repository.SuggestProjectRepo;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SuggestProjectUCImpl implements SuggestProjectUC {
    private final UserRepository userRepo;
    private final ProjectRepo projectRepo;
    private final SuggestProjectRepo suggestProjectRepo;

    public SuggestProjectUCImpl(UserRepository userRepo, ProjectRepo projectRepo, SuggestProjectRepo suggestProjectRepo) {
        this.userRepo = userRepo;
        this.projectRepo = projectRepo;
        this.suggestProjectRepo = suggestProjectRepo;
    }

    @Override
    public List<SuggestProjectDTO> getAllSuggestProjects() {
        return suggestProjectRepo.findAll();
    }

    @Override
    public SuggestProjectDTO createSuggestProject(SuggestProjectDTO suggestProjectDTO) {
        if (suggestProjectDTO.getFreelancerId() != null && suggestProjectDTO.getFreelancerId().getId() > 0) {
            UserDTO fullUser = userRepo.findById(suggestProjectDTO.getFreelancerId().getId()).orElse(suggestProjectDTO.getFreelancerId());
            suggestProjectDTO.setFreelancerId(fullUser);
        }
        if (suggestProjectDTO.getProjectId() != null && suggestProjectDTO.getProjectId().getId() > 0) {
            ProjectDTO projects = projectRepo.findById(suggestProjectDTO.getProjectId().getId());
            suggestProjectDTO.setProjectId(projects);
        }

        // Add validation for milestones
        if (suggestProjectDTO.getMilestones() != null && !suggestProjectDTO.getMilestones().isEmpty()) {
            suggestProjectDTO.getMilestones().forEach(milestone -> {
                if (milestone.getName() == null) {
                    milestone.setName("Milestone");
                }
                if (milestone.getDescription() == null) {
                    milestone.setDescription("Milestone description");
                }
                if (milestone.getDurationDays() == null) {
                    milestone.setDurationDays(7); // Default to 7 days if not specified
                }
                // Amount is already set in your example so we don't need to handle it
            });
        }


        return suggestProjectRepo.save(suggestProjectDTO);
    }

    @Override
    public SuggestProjectDTO updateSuggestProject(SuggestProjectDTO suggestProjectDTO) {
        return suggestProjectRepo.save(suggestProjectDTO);
    }

    @Override
    public void deleteSuggestProject(Long id) {
        suggestProjectRepo.deleteById(id);
    }

    @Override
    public Optional<SuggestProjectDTO> findById(Long id) {
        return suggestProjectRepo.findById(id);
    }
}