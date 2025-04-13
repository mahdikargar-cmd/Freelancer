package com.manage.freelancer.infrastructure.persistence.repository;

import com.manage.freelancer.domain.entity.Message;

import java.util.List;

public interface MessageRepository {
    List<Message> getMessagesByProjectId(Long projectId);
    Message save(Message message);
}
