package com.manage.freelancer.AAA.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.manage.freelancer.AAA.domain.model.User;
import com.manage.freelancer.application.usecaseimpl.MessageUcImpl;
import com.manage.freelancer.domain.entity.Message;
import com.manage.freelancer.domain.entity.Project;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class CustomWebSocketHandler extends TextWebSocketHandler {
    private static final Logger logger = Logger.getLogger(CustomWebSocketHandler.class.getName());

    private final JwtService jwtService;
    private final StringRedisTemplate redisTemplate;
    private final MessageUcImpl messageUc;
    private final ObjectMapper objectMapper;

    private static final long ONLINE_TTL_SECONDS = 30;
    private static final long HEARTBEAT_INTERVAL_SECONDS = 20;

    // Track active user sessions
    private static final ConcurrentHashMap<String, WebSocketSession> sessions = new ConcurrentHashMap<>();
    // Map to track session tokens
    private static final ConcurrentHashMap<String, String> sessionTokens = new ConcurrentHashMap<>();
    // Map to track user IDs by session ID
    private static final ConcurrentHashMap<String, String> sessionUserIds = new ConcurrentHashMap<>();

    private final ScheduledExecutorService heartbeatScheduler = Executors.newScheduledThreadPool(1);

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        try {
            // Extract and validate the user ID and token
            Map<String, Object> sessionData = extractSessionData(session);
            String userId = (String) sessionData.get("userId");
            String token = (String) sessionData.get("token");
            String username = (String) sessionData.get("username");

            // Store session and token
            sessions.put(userId, session);
            sessionTokens.put(session.getId(), token);
            sessionUserIds.put(session.getId(), userId);

            // Mark user as online in Redis
            redisTemplate.opsForValue().set("online:user:" + userId, "true", ONLINE_TTL_SECONDS, TimeUnit.SECONDS);

            // Send acknowledgment message to the client
            sendMessage(session, new ResponseMessage("connected", "اتصال موفقیت‌آمیز بود", null));

            // Setup heartbeat for this session
            setupHeartbeat(session);

            logger.info("WebSocket connection established for user: " + userId + " (" + username + ")");
        } catch (Exception e) {
            logger.log(Level.WARNING, "Connection establishment failed: " + e.getMessage(), e);

            // Send error message and close the connection
            try {
                sendMessage(session, new ResponseMessage("error", e.getMessage(), null));
            } finally {
                session.close(CloseStatus.BAD_DATA.withReason(e.getMessage()));
            }
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        try {
            // Extract user ID from session data
            String userId = sessionUserIds.get(session.getId());

            if (userId != null) {
                // Remove session data
                sessions.remove(userId);
                redisTemplate.delete("online:user:" + userId);
                logger.info("WebSocket connection closed for user: " + userId);
            }

            // Clean up token mapping and user ID mapping
            sessionTokens.remove(session.getId());
            sessionUserIds.remove(session.getId());

        } catch (Exception e) {
            logger.log(Level.WARNING, "Error during connection closure: " + e.getMessage(), e);
        }
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        try {
            // Get user ID from session mapping
            String userId = sessionUserIds.get(session.getId());
            if (userId == null) {
                throw new RuntimeException("نشست کاربر یافت نشد");
            }

            // Parse message payload
            MessagePayload payload = objectMapper.readValue(message.getPayload(), MessagePayload.class);

            // Handle heartbeat messages
            if ("ping".equals(payload.getType())) {
                handlePing(session, userId);
                return;
            }

            // Create and save message
            Message msg = Message.builder()
                    .sender(User.builder().id(Long.valueOf(userId)).build())
                    .content(payload.getContent())
                    .projectId(Project.builder().id(Long.valueOf(payload.getProjectId())).build())
                    .createTime(LocalDateTime.now())
                    .build();

            Message saved = messageUc.sendMessage(msg);

            // Send to receiver if online
            if (payload.getReceiverId() != null) {
                String receiverId = payload.getReceiverId();
                WebSocketSession receiverSession = sessions.get(receiverId);
                if (receiverSession != null && receiverSession.isOpen()) {
                    sendMessage(receiverSession, new ResponseMessage("message", "پیام جدید", saved));
                }
            }

            // Confirm to sender
            sendMessage(session, new ResponseMessage("sent", "پیام با موفقیت ارسال شد", saved));

        } catch (Exception e) {
            logger.log(Level.WARNING, "Error handling message: " + e.getMessage(), e);
            handleError(session, e);
        }
    }

    private Map<String, Object> extractSessionData(WebSocketSession session) {
        try {
            // Extract query parameters
            Map<String, String> parameters = parseQueryString(session.getUri().getQuery());

            String userId = parameters.get("userId");
            String token = parameters.get("token");

            // Validate parameters
            if (userId == null || userId.isEmpty()) {
                throw new RuntimeException("شناسه کاربر ارائه نشده است");
            }

            if (token == null || token.isEmpty()) {
                throw new RuntimeException("توکن JWT ارائه نشده است");
            }

            // Validate token
            if (!jwtService.TokenValid(token)) {
                throw new RuntimeException("توکن JWT نامعتبر است");
            }

            // Extract username from token
            String username = jwtService.extractUsername(token);
            if (username == null || username.isEmpty()) {
                throw new RuntimeException("نام کاربری در توکن یافت نشد");
            }

            // Get userId from token (if available)
            Long tokenUserId = jwtService.extractUserId(token);

            // Only verify user ID if it's present in the token
            if (tokenUserId != null && !userId.equals(tokenUserId.toString())) {
                throw new RuntimeException("هویت کاربر نامعتبر است");
            }

            // Return validated session data
            Map<String, Object> sessionData = new HashMap<>();
            sessionData.put("userId", userId);
            sessionData.put("username", username);
            sessionData.put("token", token);

            return sessionData;

        } catch (Exception e) {
            throw new RuntimeException("خطا در استخراج اطلاعات کاربر: " + e.getMessage(), e);
        }
    }

    private Map<String, String> parseQueryString(String query) {
        if (query == null || query.isEmpty()) {
            throw new RuntimeException("پارامترهای درخواست موجود نیستند");
        }

        return Arrays.stream(query.split("&"))
                .map(param -> param.split("=", 2))
                .filter(pair -> pair.length == 2)
                .collect(Collectors.toMap(
                        pair -> pair[0],
                        pair -> pair[1]
                ));
    }

    private void handlePing(WebSocketSession session, String userId) {
        try {
            // Refresh user's online status in Redis
            redisTemplate.opsForValue().set("online:user:" + userId, "true", ONLINE_TTL_SECONDS, TimeUnit.SECONDS);

            // Send pong response
            sendMessage(session, new ResponseMessage("pong", null, null));
        } catch (Exception e) {
            logger.warning("Error handling ping: " + e.getMessage());
        }
    }

    private void setupHeartbeat(WebSocketSession session) {
        heartbeatScheduler.scheduleAtFixedRate(() -> {
            try {
                if (session.isOpen()) {
                    // Send heartbeat to client
                    sendMessage(session, new ResponseMessage("heartbeat", null, null));
                }
            } catch (Exception e) {
                logger.warning("Heartbeat failed: " + e.getMessage());
            }
        }, HEARTBEAT_INTERVAL_SECONDS, HEARTBEAT_INTERVAL_SECONDS, TimeUnit.SECONDS);
    }

    private void handleError(WebSocketSession session, Exception e) {
        try {
            sendMessage(session, new ResponseMessage("error", e.getMessage(), null));
        } catch (IOException ex) {
            logger.warning("Failed to send error message: " + ex.getMessage());
        }
    }

    private void sendMessage(WebSocketSession session, ResponseMessage message) throws IOException {
        if (session.isOpen()) {
            session.sendMessage(new TextMessage(objectMapper.writeValueAsString(message)));
        }
    }

    // Get online status of users
    public boolean isUserOnline(Long userId) {
        return redisTemplate.hasKey("online:user:" + userId);
    }

    // Get list of online users
    public Set<String> getOnlineUsers() {
        Set<String> keys = redisTemplate.keys("online:user:*");
        if (keys == null) {
            return Collections.emptySet();
        }

        return keys.stream()
                .map(key -> key.substring("online:user:".length()))
                .collect(Collectors.toSet());
    }

    // Send broadcast message to all connected users
    public void broadcastMessage(String type, String message, Object data) {
        sessions.values().forEach(session -> {
            try {
                if (session.isOpen()) {
                    sendMessage(session, new ResponseMessage(type, message, data));
                }
            } catch (Exception e) {
                logger.warning("Broadcast failed for session " + session.getId() + ": " + e.getMessage());
            }
        });
    }

    // Inner classes for message handling

    public static class MessagePayload {
        private String type; // message, ping, etc.
        private String content;
        private String projectId;
        private String receiverId;
        private String senderId; // Added senderId field

        // Getters and setters
        public String getType() {
            return type;
        }

        public void setType(String type) {
            this.type = type;
        }

        public String getContent() {
            return content;
        }

        public void setContent(String content) {
            this.content = content;
        }

        public String getProjectId() {
            return projectId;
        }

        public void setProjectId(String projectId) {
            this.projectId = projectId;
        }

        public String getReceiverId() {
            return receiverId;
        }

        public void setReceiverId(String receiverId) {
            this.receiverId = receiverId;
        }

        public String getSenderId() {
            return senderId;
        }

        public void setSenderId(String senderId) {
            this.senderId = senderId;
        }
    }

    private static class ResponseMessage {
        private String type;
        private String message;
        private Object data;
        private long timestamp;

        public ResponseMessage(String type, String message, Object data) {
            this.type = type;
            this.message = message;
            this.data = data;
            this.timestamp = System.currentTimeMillis();
        }

        public String getType() {
            return type;
        }

        public String getMessage() {
            return message;
        }

        public Object getData() {
            return data;
        }

        public long getTimestamp() {
            return timestamp;
        }
    }
}