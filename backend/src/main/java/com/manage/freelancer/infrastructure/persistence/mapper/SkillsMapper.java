package com.manage.freelancer.infrastructure.persistence.mapper;

import com.manage.freelancer.domain.entity.Skills;
import com.manage.freelancer.infrastructure.persistence.entityDTO.SkillDTO;
import org.springframework.stereotype.Component;


@Component
public class SkillsMapper {

    public Skills toDomain(SkillDTO skillDTO) {
        if (skillDTO == null) return null;

        return Skills.builder()
                .id(skillDTO.getId())
                .name(skillDTO.getName())
                .build();
    }

    public SkillDTO toDTO(Skills skills) {
        if (skills == null) return null;

        return SkillDTO.builder()
                .id(skills.getId())
                .name(skills.getName())
                .build();
    }
}
