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
    private String token; // Optional: for JWT token support

    public AuthResponse(String message) {
        this.message = message;
    }
}