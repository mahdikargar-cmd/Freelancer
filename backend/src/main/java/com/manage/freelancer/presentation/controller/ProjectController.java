
package com.manage.freelancer.presentation.controller;

import com.manage.freelancer.application.usecaseimpl.ProjectUCImpl;
import com.manage.freelancer.infrastructure.persistence.entityDTO.ProjectDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
@RestController
@RequiredArgsConstructor
public class ProjectController {
    private final ProjectUCImpl projectUC;

    @GetMapping("/app/getProjects")
    public ResponseEntity<Page<ProjectDTO>> getProjects(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "6") int size,
            @RequestParam(required = false) String sortBy,
            @RequestParam(required = false) Boolean active,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String priceRange) {

        // پردازش sortBy
        String sortField = "id";
        Sort.Direction sortDirection = Sort.Direction.DESC;
        if (sortBy != null && !sortBy.isEmpty()) {
            String[] sortParams = sortBy.split(",");
            sortField = sortParams[0];
            sortDirection = sortParams.length > 1 && sortParams[1].equalsIgnoreCase("asc")
                    ? Sort.Direction.ASC
                    : Sort.Direction.DESC;
        }

        Pageable pageable = PageRequest.of(page, size, Sort.by(sortDirection, sortField));
        Page<ProjectDTO> projects = projectUC.getFilteredProjects(active, category, priceRange, pageable);
        return ResponseEntity.ok(projects);
    }

    @GetMapping("/pro/getProjects")
    public ResponseEntity<Page<ProjectDTO>> getProjectspub(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "6") int size,
            @RequestParam(required = false) String sortBy,
            @RequestParam(required = false) Boolean active,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String priceRange) {

        // پردازش sortBy
        String sortField = "id";
        Sort.Direction sortDirection = Sort.Direction.DESC;
        if (sortBy != null && !sortBy.isEmpty()) {
            String[] sortParams = sortBy.split(",");
            sortField = sortParams[0];
            sortDirection = sortParams.length > 1 && sortParams[1].equalsIgnoreCase("asc")
                    ? Sort.Direction.ASC
                    : Sort.Direction.DESC;
        }

        Pageable pageable = PageRequest.of(page, size, Sort.by(sortDirection, sortField));
        Page<ProjectDTO> projects = projectUC.getFilteredProjects(active, category, priceRange, pageable);
        return ResponseEntity.ok(projects);
    }


    @GetMapping("/pro/getProject/{id}")
    public ResponseEntity<Object> getProject(@PathVariable Long id) {
        try {
            ProjectDTO projectDTO = projectUC.getProjectById(id);
            if (projectDTO == null) {
                return ResponseEntity.status(404).body(Map.of("error", "Project not found with ID: " + id));
            }
            return ResponseEntity.ok(projectDTO);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", e.getMessage()));
        }
    }
    @PostMapping("/app/createProject")
    public ResponseEntity<ProjectDTO> createProject(@RequestBody ProjectDTO projectDTO) {
        try {
            ProjectDTO createdProject = projectUC.createProject(projectDTO);
            return ResponseEntity.ok(createdProject);
        } catch (IllegalArgumentException | IllegalStateException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }
    @PutMapping("/app/projects/{projectId}/addSuggestion")
    public ResponseEntity<ProjectDTO> addSuggestion(
            @PathVariable Long projectId,
            @RequestBody Map<String, Long> request){
        Long freelancerId = request.get("freelancerId");
        if (freelancerId == null) {
            return ResponseEntity.badRequest().build();
        }
        try {
            ProjectDTO updatedProject = projectUC.addSuggestion(projectId, freelancerId);
            return ResponseEntity.ok(updatedProject);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @PutMapping("/app/updateProjectStatus/{id}")
    public ResponseEntity<String> updateProjectStatus(@PathVariable Long id, @RequestBody ProjectStatusUpdate statusUpdate) {
        ProjectDTO existingProject = projectUC.getProjectById(id);
        if (existingProject == null) {
            return ResponseEntity.status(404).body("Project not found");
        }
        existingProject.setActive(statusUpdate.isActive());
        if (statusUpdate.isActive() && "PENDING".equals(existingProject.getStatus())) {
            existingProject.setStatus("OPEN");
        }
        projectUC.updateProject(existingProject);
        return ResponseEntity.ok("Project status updated successfully");
    }

    @DeleteMapping("/app/deleteProject/{id}")
    public ResponseEntity<Void> deleteProject(@PathVariable Long id) {
        projectUC.deleteProject(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/app/getSubject")
    public ResponseEntity<ProjectDTO> getSubject(@RequestParam String subject) {
        return ResponseEntity.ok(projectUC.getProjectBySubject(subject));
    }

    @GetMapping("/app/getSkills")
    public ResponseEntity<List<ProjectDTO>> getSkills(@RequestParam String skills) {
        return ResponseEntity.ok(projectUC.getProjectBySkills(skills));
    }

    @GetMapping("/app/getCategory")
    public ResponseEntity<ProjectDTO> getCategory(@RequestParam String category) {
        return ResponseEntity.ok(projectUC.getProjectByCategory(category));
    }

    @GetMapping("/app/employer/{userId}")
    public ResponseEntity<List<ProjectDTO>> getProjectsByEmployer(@PathVariable Long userId) {
        List<ProjectDTO> projects = projectUC.getProjectByEmployerId(userId);
        if (projects == null || projects.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(projects);
    }

    @GetMapping("/app/getEmployer")
    public ResponseEntity<List<ProjectDTO>> getEmployer(@RequestParam Long id) {
        List<ProjectDTO> projects = projectUC.getProjectByEmployerId(id);
        if (projects == null || projects.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(projects);
    }
}

class ProjectStatusUpdate {
    private boolean active;

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }
}
