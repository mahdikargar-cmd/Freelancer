package com.manage.freelancer.infrastructure.persistence.repository;

import com.manage.freelancer.domain.entity.SuggestProject;
import com.manage.freelancer.infrastructure.persistence.entityDTO.SuggestProjectDTO;

import java.util.List;
import java.util.Optional;

public interface SuggestProjectRepo {
    List<SuggestProjectDTO> findAll();

    Optional<SuggestProjectDTO> findById(Long id);

    void deleteById(Long id);

    SuggestProjectDTO update(SuggestProject suggestProject);

    SuggestProjectDTO save(SuggestProjectDTO suggestProjectDTO);

    List<SuggestProjectDTO> findByProjectId(Long projectId); // جدید
    List<SuggestProjectDTO> findByFreelancerId(Long freelancerId); // جدید
}