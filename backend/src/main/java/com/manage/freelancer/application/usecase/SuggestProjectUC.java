package com.manage.freelancer.application.usecase;

import com.manage.freelancer.infrastructure.persistence.entityDTO.SuggestProjectDTO;

import java.util.List;
import java.util.Optional;

public interface SuggestProjectUC {
    List<SuggestProjectDTO> getAllSuggestProjects();

    SuggestProjectDTO createSuggestProject(SuggestProjectDTO suggestProjectDTO);

    SuggestProjectDTO updateSuggestProject(SuggestProjectDTO suggestProjectDTO);

    void deleteSuggestProject(Long id);

    Optional<SuggestProjectDTO> findById(Long id);
}