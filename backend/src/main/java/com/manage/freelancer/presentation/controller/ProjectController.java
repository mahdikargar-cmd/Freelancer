
package com.manage.freelancer.presentation.controller;

import com.manage.freelancer.application.usecaseimpl.ProjectUCImpl;
import com.manage.freelancer.infrastructure.persistence.entityDTO.ProjectDTO;
import jakarta.validation.Valid;
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
@RequestMapping("/app")
@RequiredArgsConstructor
public class ProjectController {
    private final ProjectUCImpl projectUC;

    @GetMapping("/getProjects")
    public ResponseEntity<Page<ProjectDTO>> getProjects(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "6") int size,
            @RequestParam(defaultValue = "id,desc") String sort,
            @RequestParam(required = false) Boolean active) {

        String[] sortParams = sort.split(",");
        String sortField = sortParams[0];
        Sort.Direction sortDirection = sortParams.length > 1 && sortParams[1].equalsIgnoreCase("asc")
                ? Sort.Direction.ASC
                : Sort.Direction.DESC;

        Pageable pageable = PageRequest.of(page, size, Sort.by(sortDirection, sortField));
        Page<ProjectDTO> projects = active != null
                ? projectUC.getProjectsByActive(active, pageable)
                : projectUC.getAllProjects(pageable);
        return ResponseEntity.ok(projects);
    }

    @GetMapping("/{id}")
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
    @PostMapping("/createProject")
    public ResponseEntity<ProjectDTO> createProject(@RequestBody ProjectDTO projectDTO) {
        try {
            ProjectDTO createdProject = projectUC.createProject(projectDTO);
            return ResponseEntity.ok(createdProject);
        } catch (IllegalArgumentException | IllegalStateException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }
    @PutMapping("/projects/{projectId}/addSuggestion")
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
    @PutMapping("/updateProject/{id}")
    public ResponseEntity<ProjectDTO> updateProject(@PathVariable Long id, @Valid @RequestBody ProjectDTO projectDTO) {
        projectDTO.setId(id);
        try {
            ProjectDTO updatedProject = projectUC.updateProject(projectDTO);
            return ResponseEntity.ok(updatedProject);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/updateProjectStatus/{id}")
    public ResponseEntity<String> updateProjectStatus(@PathVariable Long id, @RequestBody ProjectStatusUpdate statusUpdate) {
        ProjectDTO existingProject = projectUC.getProjectById(id);
        if (existingProject == null) {
            return ResponseEntity.status(404).body("Project not found");
        }
        existingProject.setActive(statusUpdate.isActive());
        projectUC.updateProject(existingProject);
        return ResponseEntity.ok("Project status updated successfully");
    }

    @DeleteMapping("/deleteProject/{id}")
    public ResponseEntity<Void> deleteProject(@PathVariable Long id) {
        projectUC.deleteProject(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/getSubject")
    public ResponseEntity<ProjectDTO> getSubject(@RequestParam String subject) {
        return ResponseEntity.ok(projectUC.getProjectBySubject(subject));
    }

    @GetMapping("/getSkills")
    public ResponseEntity<List<ProjectDTO>> getSkills(@RequestParam String skills) {
        return ResponseEntity.ok(projectUC.getProjectBySkills(skills));
    }

    @GetMapping("/getCategory")
    public ResponseEntity<ProjectDTO> getCategory(@RequestParam String category) {
        return ResponseEntity.ok(projectUC.getProjectByCategory(category));
    }

    @GetMapping("/employer/{userId}")
    public ResponseEntity<List<ProjectDTO>> getProjectsByEmployer(@PathVariable Long userId) {
        List<ProjectDTO> projects = projectUC.getProjectByEmployerId(userId);
        if (projects == null || projects.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(projects);
    }

    @GetMapping("/getEmployer")
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
