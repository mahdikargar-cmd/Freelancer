package com.manage.freelancer.infrastructure.persistence.repositoryimpl;

import com.manage.freelancer.domain.entity.Message;
import com.manage.freelancer.infrastructure.persistence.entityDTO.MessageDTO;
import com.manage.freelancer.infrastructure.persistence.jparepository.JpaMessageRepository;
import com.manage.freelancer.infrastructure.persistence.mapper.MessageMapper;
import com.manage.freelancer.infrastructure.persistence.repository.MessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Repository
@RequiredArgsConstructor
public class MessageRepositoryImpl implements MessageRepository {
    private final JpaMessageRepository jpaMessageRepository;
    private final MessageMapper messageMapper;

    @Override
    @Transactional(readOnly = true)
    public List<Message> getMessagesByProjectId(Long projectId) {
        return jpaMessageRepository.findAllByProjectId_IdOrderByTimeAsc(projectId)
                .stream()
                .map(messageMapper::toDomain)
                .collect(Collectors.toList()).reversed();
    }

    @Override
    @Transactional
    public Message save(Message message) {
        MessageDTO jpaEntity = messageMapper.toDTO(message);
        MessageDTO saved = jpaMessageRepository.save(jpaEntity);
        return messageMapper.toDomain(saved);
    }
}