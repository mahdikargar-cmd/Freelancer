
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
            UserDTO fullUser = userRepo.findById(suggestProjectDTO.getFreelancerId().getId())
                    .orElse(suggestProjectDTO.getFreelancerId());
            suggestProjectDTO.setFreelancerId(fullUser);
        }
        if (suggestProjectDTO.getProjectId() != null && suggestProjectDTO.getProjectId().getId() > 0) {
            ProjectDTO projects = projectRepo.findById(suggestProjectDTO.getProjectId().getId());
            suggestProjectDTO.setProjectId(projects);
        }

        // اعتبارسنجی و تنظیم پیش‌فرض برای milestones
        if (suggestProjectDTO.getMilestones() != null && !suggestProjectDTO.getMilestones().isEmpty()) {
            suggestProjectDTO.getMilestones().forEach(milestone -> {
                if (milestone.getName() == null) {
                    milestone.setName("Milestone");
                }

                if (milestone.getDurationDays() == null) {
                    milestone.setDurationDays(7); // پیش‌فرض 7 روز
                }
                // amount و dueDate از فرانت‌اند می‌آیند
            });
        }

        return suggestProjectRepo.save(suggestProjectDTO);
    }

    @Override
    public SuggestProjectDTO updateSuggestProject(SuggestProjectDTO suggestProjectDTO) {
        // اطمینان از وجود id
        if (suggestProjectDTO.getId() == null) {
            throw new IllegalArgumentException("ایدی کاربر یافت نشد");
        }

        // لود رکورد موجود از دیتابیس
        Optional<SuggestProjectDTO> existingSuggestOpt = suggestProjectRepo.findById(suggestProjectDTO.getId());
        if (!existingSuggestOpt.isPresent()) {
            throw new IllegalArgumentException("SuggestProject with ID " + suggestProjectDTO.getId() + " not found");
        }

        SuggestProjectDTO existingSuggest = existingSuggestOpt.get();

        // اعمال تغییرات روی رکورد موجود
        existingSuggest.setTitle(suggestProjectDTO.getTitle());
        existingSuggest.setContent(suggestProjectDTO.getContent());
        existingSuggest.setProposedBudget(suggestProjectDTO.getProposedBudget());
        existingSuggest.setEstimatedDuration(suggestProjectDTO.getEstimatedDuration());
        existingSuggest.setStatus(suggestProjectDTO.getStatus());
        existingSuggest.setMilestones(suggestProjectDTO.getMilestones());
        existingSuggest.setAssigned(suggestProjectDTO.getAssigned());
        existingSuggest.setStartChat(suggestProjectDTO.getStartChat());

        // آپدیت روابط (در صورت نیاز)
        if (suggestProjectDTO.getFreelancerId() != null && suggestProjectDTO.getFreelancerId().getId() > 0) {
            UserDTO fullUser = userRepo.findById(suggestProjectDTO.getFreelancerId().getId())
                    .orElse(suggestProjectDTO.getFreelancerId());
            existingSuggest.setFreelancerId(fullUser);
        }
        if (suggestProjectDTO.getProjectId() != null && suggestProjectDTO.getProjectId().getId() > 0) {
            ProjectDTO project = projectRepo.findById(suggestProjectDTO.getProjectId().getId());
            existingSuggest.setProjectId(project);
        }

        // ذخیره تغییرات
        return suggestProjectRepo.save(existingSuggest);
    }

    @Override
    public void deleteSuggestProject(Long id) {
        suggestProjectRepo.deleteById(id);
    }

    @Override
    public List<SuggestProjectDTO> getByid(Long id) {
        return suggestProjectRepo.findByProjectId(id);
    }

    @Override
    public Optional<SuggestProjectDTO> findById(Long id) {
        return suggestProjectRepo.findById(id);
    }

    @Override
    public List<SuggestProjectDTO> findByFreelancerId(Long id) {
        return suggestProjectRepo.findByFreelancerId(id);
    }


}
