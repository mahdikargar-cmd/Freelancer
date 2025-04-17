package com.manage.freelancer.infrastructure.persistence.mapper;

import com.manage.freelancer.AAA.infrastructure.UserMapper;
import com.manage.freelancer.domain.entity.Message;
import com.manage.freelancer.infrastructure.persistence.entityDTO.MessageDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class MessageMapper {
    private final UserMapper userMapper;
    private final ProjectMapper projectMapper;

    public Message toDomain(MessageDTO dto) {
        if (dto == null) return null;

        return Message.builder()
                .id(dto.getId())
                .content(dto.getContent())
                .time(dto.getTime())
                .sender(dto.getSender() != null ? userMapper.toDomain(dto.getSender()) : null)
                .projectId(dto.getProjectId() != null ? projectMapper.toDomain(dto.getProjectId()) : null)
                .build();
    }

    public MessageDTO toDTO(Message domain) {
        if (domain == null) return null;

        return MessageDTO.builder()
                .id(domain.getId())
                .content(domain.getContent())
                .time(domain.getTime())
                .sender(domain.getSender() != null ? userMapper.toDTO(domain.getSender()) : null)
                .projectId(domain.getProjectId() != null ? projectMapper.toDTO(domain.getProjectId()) : null)
                .build();
    }
}
