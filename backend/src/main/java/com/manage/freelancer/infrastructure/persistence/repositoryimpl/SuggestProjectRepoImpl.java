package com.manage.freelancer.infrastructure.persistence.repositoryimpl;

import com.manage.freelancer.domain.entity.SuggestProject;
import com.manage.freelancer.infrastructure.persistence.entityDTO.SuggestProjectDTO;
import com.manage.freelancer.infrastructure.persistence.jparepository.SuggestsProjectJPARepo;
import com.manage.freelancer.infrastructure.persistence.mapper.SuggestProjectMapper;
import com.manage.freelancer.infrastructure.persistence.repository.SuggestProjectRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
class SuggestProjectRepoImpl implements SuggestProjectRepo {
    @Autowired
    private SuggestProjectMapper suggestProjectMapper;
    @Autowired
    private SuggestsProjectJPARepo suggestsProjectJPARepo;

    @Override
    public List<SuggestProjectDTO> findAll() {
        return suggestsProjectJPARepo.findAll();
    }

    @Override
    public Optional<SuggestProjectDTO> findById(Long id) {
        return suggestsProjectJPARepo.findById(id);
    }

    @Override
    public void deleteById(Long id) {
        suggestsProjectJPARepo.deleteById(id);
    }

    @Override
    public SuggestProjectDTO update(SuggestProject suggestProject) {
        SuggestProjectDTO dto = suggestProjectMapper.toDTO(suggestProject);
        return suggestsProjectJPARepo.save(dto);
    }

    @Override
    public SuggestProjectDTO save(SuggestProjectDTO suggestProjectDTO) {
        return suggestsProjectJPARepo.save(suggestProjectDTO);
    }
}