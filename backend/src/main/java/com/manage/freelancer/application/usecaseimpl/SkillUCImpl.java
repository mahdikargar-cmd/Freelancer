package com.manage.freelancer.application.usecaseimpl;

import com.manage.freelancer.application.usecase.SkillUC;
import com.manage.freelancer.infrastructure.persistence.entityDTO.SkillDTO;
import com.manage.freelancer.infrastructure.persistence.repository.SkillRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SkillUCImpl implements SkillUC {
    private final SkillRepo skillRepo;

    @Override
    public List<SkillDTO> getALLSkills() {
        return skillRepo.findAll();
    }

    @Override
    public SkillDTO getSkillById(int id) {
        return skillRepo.findById(id);
    }

    @Override
    public SkillDTO saveSkill(SkillDTO skillDTO) {
        return skillRepo.save(skillDTO);
    }

    @Override
    public SkillDTO updateSkill(SkillDTO skillDTO) {
        return skillRepo.update(skillDTO);
    }

    @Override
    public void deleteSkill(int id) {
        SkillDTO skillDTO = skillRepo.findById(id);
        skillRepo.delete(skillDTO);
    }

    @Override
    public SkillDTO getSkillByName(String name) {
        return skillRepo.findByName(name);
    }
}