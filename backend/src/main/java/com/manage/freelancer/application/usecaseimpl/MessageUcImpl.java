package com.manage.freelancer.application.usecaseimpl;

import com.manage.freelancer.domain.entity.Message;
import com.manage.freelancer.infrastructure.persistence.repository.MessageRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@AllArgsConstructor
public class MessageUcImpl {
    private final MessageRepository messageRepository;

    public List<Message> getMessagesForProject(Long projectId) {
        return messageRepository.getMessagesByProjectId(projectId);
    }

    public Message sendMessage(Message message) {
        message.setCreateTime(LocalDateTime.now());
        return messageRepository.save(message);
    }
}