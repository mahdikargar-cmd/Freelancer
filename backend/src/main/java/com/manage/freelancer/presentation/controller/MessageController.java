package com.manage.freelancer.presentation.controller;

import com.manage.freelancer.application.usecaseimpl.MessageUcImpl;
import com.manage.freelancer.domain.entity.Message;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/app/messages")
public class MessageController {
    private final MessageUcImpl messageUc;

    @GetMapping
    public ResponseEntity<List<Message>> getMessagesByProject(@RequestParam Long projectId) {
        List<Message> messages = messageUc.getMessagesByProject(projectId);
        return ResponseEntity.ok(messages);
    }

    @PostMapping
    public ResponseEntity<Message> sendMessage(@RequestBody Message message) {
        Message savedMessage = messageUc.sendMessage(message);
        return ResponseEntity.ok(savedMessage);
    }
}