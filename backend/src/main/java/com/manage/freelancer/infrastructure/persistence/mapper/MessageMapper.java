package com.manage.freelancer.infrastructure.persistence.mapper;

import com.manage.freelancer.AAA.infrastructure.UserMapper;
import com.manage.freelancer.AAA.infrastructure.entity.UserDTO;
import com.manage.freelancer.domain.entity.Message;
import com.manage.freelancer.infrastructure.persistence.entityDTO.MessageDTO;
import com.manage.freelancer.infrastructure.persistence.entityDTO.ProjectDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class MessageMapper {

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private ProjectMapper projectMapper;

    public Message toDomain(MessageDTO dto) {
        return Message.builder()
                .id(dto.getId())
                .content(dto.getContent())
                .createTime(dto.getCreateTime())
                .sender(userMapper.toDomain(dto.getSender()))
                .projectId(projectMapper.toDomain(dto.getProjectId()))
                .build();
    }

    public MessageDTO toDTO(Message domain) {
        UserDTO senderDTO = new UserDTO();
        senderDTO.setId(domain.getSender().getId());
        ProjectDTO projectDTO = new ProjectDTO();
        projectDTO.setId(domain.getProjectId().getId());
        return MessageDTO.builder()
                .id(domain.getId())
                .content(domain.getContent())
                .createTime(domain.getCreateTime())
                .sender(senderDTO)
                .projectId(projectDTO)
                .build();
    }


}
