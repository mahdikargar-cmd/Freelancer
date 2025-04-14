package com.manage.freelancer.presentation.controller;

import com.manage.freelancer.application.usecaseimpl.ProjectUCImpl;
import com.manage.freelancer.infrastructure.persistence.entityDTO.ProjectDTO;
import com.manage.freelancer.infrastructure.persistence.mapper.ProjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/app")
@RequiredArgsConstructor
public class ProjectController {
    private final ProjectUCImpl projectUC;
    private final ProjectMapper projectMapper;

    @GetMapping("/getProjects")
    public ResponseEntity<Page<ProjectDTO>> getProjects(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sort) {

        Pageable pageable = PageRequest.of(page, size, Sort.by(sort).descending());
        return ResponseEntity.ok(projectUC.getAllProjects(pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProjectDTO> getProject(@PathVariable Long id) {
        ProjectDTO projectDTO = projectUC.getProjectById(id);
        if (projectDTO == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(projectDTO);
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

    @PutMapping("/updateProject/{id}")
    public ResponseEntity<ProjectDTO> updateProject(@PathVariable Long id, @RequestBody ProjectDTO projectDTO) {
        projectDTO.setId(id); // مقداردهی به id
        return ResponseEntity.ok(projectUC.updateProject(projectDTO));
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
    @GetMapping("/{userId}")
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
