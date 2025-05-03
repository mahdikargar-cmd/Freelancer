package com.manage.freelancer.application.usecaseimpl;

import com.manage.freelancer.AAA.domain.model.User;
import com.manage.freelancer.domain.entity.Message;
import com.manage.freelancer.domain.entity.Project;
import com.manage.freelancer.infrastructure.persistence.entityDTO.MessageDTO;
import com.manage.freelancer.infrastructure.persistence.repository.MessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MessageUcImpl {
    private final MessageRepository messageRepository;

    @Transactional(readOnly = true)
    public List<Message> getMessagesByProject(Long projectId) {
        return messageRepository.getMessagesByProjectId(projectId);
    }

    @Transactional
    public Message sendMessage(Message message) {
        // تنظیم زمان
        message.setTime(LocalDateTime.now());
        // ذخیره در دیتابیس
        return messageRepository.save(message);
    }

    private Message toMessage(MessageDTO dto) {
        return Message.builder()
                .id(dto.getId())
                .sender(dto.getSender() != null ? User.builder().id(dto.getSender().getId()).build() : null)
                .content(dto.getContent())
                .time(dto.getTime())
                .projectId(dto.getProjectId() != null ? Project.builder().id(dto.getProjectId().getId()).build() : null)
                .build();
    }
}