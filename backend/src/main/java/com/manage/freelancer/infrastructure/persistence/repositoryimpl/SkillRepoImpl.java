package com.manage.freelancer.infrastructure.persistence.repositoryimpl;

import com.manage.freelancer.infrastructure.persistence.entityDTO.SkillDTO;
import com.manage.freelancer.infrastructure.persistence.jparepository.SkillsJPARepo;
import com.manage.freelancer.infrastructure.persistence.repository.SkillRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class SkillRepoImpl implements SkillRepo {
    private final SkillsJPARepo skillsJPARepo;

    @Override
    public List<SkillDTO> findAll() {
        return skillsJPARepo.findAll();
    }

    @Override
    public SkillDTO findById(Integer id) {
        return skillsJPARepo.findById(Long.valueOf(id))
                .orElseThrow(() -> new RuntimeException("Skill not found with id: " + id));
    }

    @Override
    public SkillDTO save(SkillDTO skillDTO) {
        return skillsJPARepo.save(skillDTO);
    }

    @Override
    public void delete(SkillDTO skillDTO) {
        skillsJPARepo.delete(skillDTO);
    }

    @Override
    public SkillDTO update(SkillDTO skillDTO) {
        return skillsJPARepo.save(skillDTO);
    }

    @Override
    public SkillDTO findByName(String name) {
        return skillsJPARepo.findByName(name);
    }
}