package com.manage.freelancer.domain.entity;

import com.manage.freelancer.AAA.domain.model.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Message {
    private Long id;
    private User sender;
    private String content;
    private Project projectId;
    private LocalDateTime createTime;
}
