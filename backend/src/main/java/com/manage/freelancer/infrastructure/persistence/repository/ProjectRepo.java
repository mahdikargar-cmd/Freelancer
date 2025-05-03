package com.manage.freelancer.infrastructure.persistence.repository;

import com.manage.freelancer.infrastructure.persistence.entityDTO.ProjectDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ProjectRepo {

    List<ProjectDTO> findByProjectName(String projectName);

    ProjectDTO findById(Long id);

    ProjectDTO save(ProjectDTO projectDTO);

    void deleteById(Long id);

    ProjectDTO update(ProjectDTO projectDTO);

    List<ProjectDTO> findBySkills(String skills);

    ProjectDTO findByCategory(String category);

    List<ProjectDTO> findByEmployerId(Long employerId);

    Page<ProjectDTO> findAll(Pageable pageable);

    Page<ProjectDTO> findByActive(boolean active, Pageable pageable);
}

