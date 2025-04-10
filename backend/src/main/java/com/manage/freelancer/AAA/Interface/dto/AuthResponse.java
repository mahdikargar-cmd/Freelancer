package com.manage.freelancer.AAA.Interface.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponse {
    private String message;
    private String token;
    private String role;

    public AuthResponse(String message) {
        this.message = message;
        this.token = null;
        this.role = null;
    }
}