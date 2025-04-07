package com.manage.freelancer.presentation.controller;

import com.manage.freelancer.application.usecase.SkillUC;
import com.manage.freelancer.infrastructure.persistence.entityDTO.SkillDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/app/skills")
@RequiredArgsConstructor
public class SkillController {

    private final SkillUC skillUC;

    @GetMapping
    public ResponseEntity<List<SkillDTO>> getAllSkills() {
        return ResponseEntity.ok(skillUC.getALLSkills());
    }

    @GetMapping("/{id}")
    public ResponseEntity<SkillDTO> getSkillById(@PathVariable int id) {
        return ResponseEntity.ok(skillUC.getSkillById(id));
    }

    @GetMapping("/name/{name}")
    public ResponseEntity<SkillDTO> getSkillByName(@PathVariable String name) {
        return ResponseEntity.ok(skillUC.getSkillByName(name));
    }

    @PostMapping
    public ResponseEntity<SkillDTO> createSkill(@RequestBody SkillDTO skillDTO) {
        return new ResponseEntity<>(skillUC.saveSkill(skillDTO), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<SkillDTO> updateSkill(@PathVariable int id, @RequestBody SkillDTO skillDTO) {
        skillDTO.setId((long) id);
        return ResponseEntity.ok(skillUC.updateSkill(skillDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSkill(@PathVariable int id) {
        skillUC.deleteSkill(id);
        return ResponseEntity.noContent().build();
    }
}