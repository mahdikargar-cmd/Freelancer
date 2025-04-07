package com.manage.freelancer.infrastructure.persistence.mapper;

import com.manage.freelancer.domain.entity.Skills;
import com.manage.freelancer.infrastructure.persistence.entityDTO.SkillDTO;
import org.springframework.stereotype.Component;

@Component
public class SkillsMapper {
    public Skills toDomain(SkillDTO skillDTO){
      return   Skills.builder()
                .id(skillDTO.getId())
                .name(skillDTO.getName())
                .build();
    }

    public SkillDTO toDTO(Skills skills){
       return SkillDTO.builder()
               .id(skills.getId())
               .name(skills.getName())
               .build();
    }
}
