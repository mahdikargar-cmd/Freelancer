package com.manage.freelancer.infrastructure.persistence.repository;

import com.manage.freelancer.infrastructure.persistence.entityDTO.SkillDTO;

import java.util.List;

public interface SkillRepo {
    List<SkillDTO> findAll();
    SkillDTO findById(Integer id);

    List<SkillDTO> findByIds(List<Long> ids);

    SkillDTO save(SkillDTO skillDTO);
    void delete(SkillDTO skillDTO);
    SkillDTO update(SkillDTO skillDTO);
    SkillDTO findByName(String name);
}