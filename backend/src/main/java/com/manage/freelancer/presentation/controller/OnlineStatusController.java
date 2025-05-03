package com.manage.freelancer.presentation.controller;

import com.manage.freelancer.AAA.config.CustomWebSocketHandler;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/app")
public class OnlineStatusController {
    private final CustomWebSocketHandler webSocketHandler;

    public OnlineStatusController(CustomWebSocketHandler webSocketHandler) {
        this.webSocketHandler = webSocketHandler;
    }

    @GetMapping("/isUserOnline/{userId}")
    public ResponseEntity<Map<String, Boolean>> isUserOnline(@PathVariable Long userId) {
        boolean online = webSocketHandler.isUserOnline(userId);
        return ResponseEntity.ok(Map.of("online", online));
    }
}