/*
package com.manage.freelancer.presentation.controller;

import com.manage.freelancer.application.usecaseimpl.ProjectUCImpl;
import com.manage.freelancer.domain.entity.Project;
import com.manage.freelancer.infrastructure.persistence.entityDTO.ProjectDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/app")
@RequiredArgsConstructor
public class ProjectController {
    private final ProjectUCImpl projectUC;

    @GetMapping("/getProjects")
    public ResponseEntity<List<ProjectDTO>> getProjects() {
        return ResponseEntity.ok(projectUC.getAllProjects());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Project> getProject(@PathVariable Long id) {
        return ResponseEntity.ok(projectUC.findById(id));
    }


    @PostMapping("/createProject")
    public ResponseEntity<ProjectDTO> createProject(@RequestBody ProjectDTO projectDTO) {
        return ResponseEntity.ok(projectUC.createProject(projectDTO));
    }

    @PutMapping("/updateProject")
    public ResponseEntity<ProjectDTO> updateProject(@RequestBody ProjectDTO projectDTO) {
        return ResponseEntity.ok(projectUC.updateProject(projectDTO));
    }

    @DeleteMapping("/deleteProject")
    public ResponseEntity<Void> deleteProject(@RequestParam Long id) {
        projectUC.deleteProject(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/getSubject")
    public ResponseEntity<ProjectDTO> getSubject(@RequestParam String subject) {
        return ResponseEntity.ok(projectUC.getProjectBySubject(subject));
    }

    @GetMapping("/getSkills")
    public ResponseEntity<List<Project>> getSkills(@RequestParam String skills) {
        return ResponseEntity.ok(projectUC.getProjectBySkills(skills));
    }

    @GetMapping("/getCategory")
    public ResponseEntity<ProjectDTO> getCategory(@RequestParam String category) {
        return ResponseEntity.ok(projectUC.getProjectByCategory(category));
    }

    @GetMapping("/getEmployer")
    public ResponseEntity<List<ProjectDTO>> getEmployer(@RequestParam Long id) {
        return ResponseEntity.ok(projectUC.getProjectByEmployerId(id.toString()));
    }
}*/
