package com.manage.freelancer.AAA.Interface.dto;

import lombok.Data;

@Data
public class PasswordResetRequest {
    private String email;
    private String newPassword;
}