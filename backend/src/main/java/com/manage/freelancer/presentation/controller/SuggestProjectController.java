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

    @PutMapping("/updateSuggest/{id}")
    public SuggestProjectDTO updateSuggest(@PathVariable Long id, @RequestBody SuggestProjectDTO suggestProjectDTO) {
        suggestProjectDTO.setId(id);
        return suggestProjectUC.updateSuggestProject(suggestProjectDTO);
    }

    @GetMapping("/IdSuggest/{id}")
    public List<SuggestProjectDTO> getById(@PathVariable Long id) {
        return suggestProjectUC.getByid(id);
    }

    @GetMapping("/freelancer/{id}")
    public List<SuggestProjectDTO> getByFreelancerId(@PathVariable Long id) {
        return suggestProjectUC.findByFreelancerId(id);
    }

    @DeleteMapping("/delSuggestP/{id}")
    public void deleteById(@PathVariable Long id) {
        suggestProjectUC.deleteSuggestProject(id);
    }

}