package com.manage.freelancer.AAA.Interface.dto;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class JwtResponse {
    private String token;
    private Long userId;
    private String message;

    // Constructor with token and message for backward compatibility
    public JwtResponse(String token, String message) {
        this.token = token;
        this.message = message;
    }
}