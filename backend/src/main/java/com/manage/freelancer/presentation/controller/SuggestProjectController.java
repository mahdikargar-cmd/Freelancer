package com.manage.freelancer.presentation.controller;

import com.manage.freelancer.application.usecase.SuggestProjectUC;
import com.manage.freelancer.infrastructure.persistence.entityDTO.SuggestProjectDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/app")
@RequiredArgsConstructor
public class SuggestProjectController {
    private final SuggestProjectUC suggestProjectUC;

    @GetMapping("/getAll")
    public List<SuggestProjectDTO> getAll() {
        return suggestProjectUC.getAllSuggestProjects();
    }

    @PostMapping("/createSuggest")
    public SuggestProjectDTO createSuggest(@RequestBody SuggestProjectDTO suggestProjectDTO) {
        return suggestProjectUC.createSuggestProject(suggestProjectDTO);
    }

    @PutMapping("/updateSuggest")
    public SuggestProjectDTO updateSuggest(@RequestBody SuggestProjectDTO suggestProjectDTO) {
        return suggestProjectUC.updateSuggestProject(suggestProjectDTO);
    }

    @GetMapping("/IdSuggest/{id}")
    public List<SuggestProjectDTO> getById(@PathVariable Long id) {
        return suggestProjectUC.getByid(id);
    }

    @DeleteMapping("/delSuggestP/{id}")
    public void deleteById(@PathVariable Long id) {
        suggestProjectUC.deleteSuggestProject(id);
    }

}