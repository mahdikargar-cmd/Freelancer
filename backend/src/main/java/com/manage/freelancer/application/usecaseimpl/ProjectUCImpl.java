package com.manage.freelancer.application.usecaseimpl;

import com.manage.freelancer.AAA.application.usecase.EmailService;
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

import java.util.ArrayList;
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
    private final EmailService emailService; // اضافه کردن سرویس ایمیل



    @Override
    public Page<ProjectDTO> getAllProjects(Pageable pageable) {
        return projectRepo.findAll(pageable);
    }

    @Override
    public ProjectDTO getProjectById(Long id) {
        return projectRepo.findById(id);
    }


    @Override
    public Page<ProjectDTO> getFilteredProjects(Boolean active, String category, String priceRange, Pageable pageable) {
        // پردازش محدوده قیمت
        Double minPrice = null;
        Double maxPrice = null;
        if (priceRange != null && !priceRange.isEmpty()) {
            String[] prices = priceRange.split("-");
            if (prices.length == 2) {
                try {
                    minPrice = Double.parseDouble(prices[0]);
                    maxPrice = Double.parseDouble(prices[1]);
                } catch (NumberFormatException e) {
                    // خطا رو لاگ کن یا نادیده بگیر
                }
            }
        }

        return projectRepo.findByFilters(active, category, minPrice, maxPrice, pageable);
    }

    @Override
    public ProjectDTO addSuggestion(Long projectId, Long freelancerId) {
        // Fetch the existing project
        ProjectDTO existingProject = projectRepo.findById(projectId);
        if (existingProject == null) {
            throw new IllegalArgumentException("Project not found with ID: " + projectId);
        }

        // Fetch the freelancer
        UserDTO freelancer = userRepo.findById(freelancerId)
                .orElseThrow(() -> new IllegalArgumentException("Freelancer not found with ID: " + freelancerId));

        // Ensure suggestions list is initialized
        List<UserDTO> suggestions = existingProject.getSuggestions();
        if (suggestions == null) {
            suggestions = new ArrayList<>();
            existingProject.setSuggestions(suggestions);
        }

        // Add freelancer to suggestions if not already present
        if (!suggestions.contains(freelancer)) {
            suggestions.add(freelancer);
            existingProject.setSuggested(existingProject.getSuggested() + 1); // Increment suggested count
        }

        // Save the updated project
        return projectRepo.update(existingProject);
    }

    @Override
    public Project findById(Long id) {
        return projectMapper.toDomain(getProjectById(id));
    }

    @Override
    public ProjectDTO createProject(ProjectDTO projectDTO) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated() || authentication.getPrincipal().equals("anonymousUser")) {
            throw new IllegalStateException("کاربر باید احراز هویت شده باشد تا پروژه ایجاد کند");
        }

        Long employerId;
        String employerEmail;
        if (authentication.getPrincipal() instanceof UserDTO) {
            UserDTO user = (UserDTO) authentication.getPrincipal();
            employerId = user.getId();
            employerEmail = user.getEmail();
        } else {
            String email = authentication.getName();
            UserDTO user = userRepo.findByEmail(email)
                    .orElseThrow(() -> new IllegalArgumentException("کاربر احراز هویت‌شده یافت نشد"));
            employerId = user.getId();
            employerEmail = user.getEmail();
        }

        UserDTO fullUser = userRepo.findById(employerId)
                .orElseThrow(() -> new IllegalArgumentException("شناسه کارفرما نامعتبر است"));
        projectDTO.setEmployerId(fullUser);

        if (projectDTO.getSkills() != null && !projectDTO.getSkills().isEmpty()) {
            List<Long> skillIds = projectDTO.getSkills()
                    .stream()
                    .map(SkillDTO::getId)
                    .collect(Collectors.toList());
            List<SkillDTO> dbSkills = skillUC.findByIds(skillIds);
            projectDTO.setSkills(dbSkills);
        }

        if (projectDTO.getCategory() != null && projectDTO.getCategory().getId() != null) {
            CategoryDTO fullCategory = categoryRepo.findByIdWithDetails(projectDTO.getCategory().getId());
            if (fullCategory == null) {
                throw new IllegalArgumentException("Invalid category ID");
            }
            projectDTO.setCategory(fullCategory);
        } else {
            throw new IllegalArgumentException("Category is required");
        }

        // ذخیره پروژه و نگه داشتن نتیجه در متغیر savedProject
        ProjectDTO savedProject = projectRepo.save(projectDTO);

        // ارسال ایمیل به ادمین بعد از ثبت پروژه
        try {
            emailService.sendProjectCreatedNotification(savedProject.getSubject(), savedProject.getId(), employerEmail);
        } catch (Exception e) {
            // لاگ کردن خطا (برای اینکه ثبت پروژه متوقف نشه)
            System.err.println("خطا در ارسال ایمیل به ادمین: " + e.getMessage());
        }

        return savedProject;
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
        // Fetch the existing project
        ProjectDTO existingProject = projectRepo.findById(projectDTO.getId());
        if (existingProject == null) {
            throw new IllegalArgumentException("Project not found with ID: " + projectDTO.getId());
        }

        // Update skills if provided
        if (projectDTO.getSkills() != null && !projectDTO.getSkills().isEmpty()) {
            List<Long> skillIds = projectDTO.getSkills()
                    .stream()
                    .map(SkillDTO::getId)
                    .collect(Collectors.toList());
            List<SkillDTO> dbSkills = skillUC.findByIds(skillIds);
            existingProject.setSkills(dbSkills);
        }

        // Update suggestions if provided
        if (projectDTO.getSuggestions() != null && !projectDTO.getSuggestions().isEmpty()) {
            List<UserDTO> updatedSuggestions = new ArrayList<>();
            for (UserDTO userDTO : projectDTO.getSuggestions()) {
                // Load full user details from database using user ID
                UserDTO fullUser = userRepo.findById(userDTO.getId())
                        .orElseThrow(() -> new IllegalArgumentException("کاربر با شناسه " + userDTO.getId() + " یافت نشد"));
                updatedSuggestions.add(fullUser);
            }
            // Initialize suggestions list if null
            if (existingProject.getSuggestions() == null) {
                existingProject.setSuggestions(new ArrayList<>());
            }
            // Add new suggestions if not already present
            for (UserDTO user : updatedSuggestions) {
                if (!existingProject.getSuggestions().contains(user)) {
                    existingProject.getSuggestions().add(user);
                    existingProject.setSuggested(existingProject.getSuggested() + 1);
                }
            }
        }

        // Update other fields only if provided
        if (projectDTO.getSubject() != null) {
            existingProject.setSubject(projectDTO.getSubject());
        }
        if (projectDTO.getDescription() != null) {
            existingProject.setDescription(projectDTO.getDescription());
        }
        if (projectDTO.getPriceStarted() != null) {
            existingProject.setPriceStarted(projectDTO.getPriceStarted());
        }
        if (projectDTO.getPriceEnded() != null) {
            existingProject.setPriceEnded(projectDTO.getPriceEnded());
        }
        if (projectDTO.getDeadline() != null) {
            existingProject.setDeadline(projectDTO.getDeadline());
        }
        if (projectDTO.getType() != null) {
            existingProject.setType(projectDTO.getType());
        }
        if (projectDTO.getStatus() != null) {
            existingProject.setStatus(projectDTO.getStatus());
        }
        existingProject.setActive(projectDTO.isActive());
        if (projectDTO.getCategory() != null) {
            existingProject.setCategory(projectDTO.getCategory());
        }

        return projectRepo.update(existingProject);
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

    public Page<ProjectDTO> getProjectsByActive(boolean active, Pageable pageable) {
        return projectRepo.findByActive(active, pageable);
    }
}