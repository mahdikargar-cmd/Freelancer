package com.manage.freelancer.application.usecaseimpl;

import com.manage.freelancer.domain.entity.Message;
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
        message.setTime(LocalDateTime.now());
        return messageRepository.save(message);
    }
}