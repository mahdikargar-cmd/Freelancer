package com.manage.freelancer.presentation.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResponseMessage {
    private String type;
    private String message;
    private Object data;
    private long timestamp;

    public ResponseMessage(String type, String message, Object data) {
        this.type = type;
        this.message = message != null ? message : getDefaultMessage(type);
        this.data = data;
        this.timestamp = System.currentTimeMillis();
    }

    private String getDefaultMessage(String type) {
        switch (type) {
            case "heartbeat":
                return "Heartbeat received";
            case "error":
                return "An error occurred";
            case "connected":
                return "Connection successful";
            case "pong":
                return "Ping acknowledged";
            default:
                return "Unknown message type";
        }
    }
}