package com.manage.freelancer.application.usecase;

import com.manage.freelancer.infrastructure.persistence.entityDTO.SkillDTO;

import java.util.List;

public interface SkillUC {
    List<SkillDTO> getALLSkills();
    SkillDTO getSkillById(int id);
    SkillDTO saveSkill(SkillDTO skillDTO);
    SkillDTO updateSkill(SkillDTO skillDTO);
    void deleteSkill(int id);
    SkillDTO getSkillByName(String name);
}