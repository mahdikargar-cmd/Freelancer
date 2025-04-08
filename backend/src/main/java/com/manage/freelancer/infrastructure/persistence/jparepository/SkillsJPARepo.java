package com.manage.freelancer.infrastructure.persistence.jparepository;

import com.manage.freelancer.infrastructure.persistence.entityDTO.SkillDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SkillsJPARepo extends JpaRepository<SkillDTO, Long> {
    SkillDTO findByName(String name);
    List<SkillDTO> findByIdIn(List<Long> ids);
}
