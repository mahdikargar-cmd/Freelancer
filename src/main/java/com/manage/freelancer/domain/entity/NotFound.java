package com.manage.freelancer.domain.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class NotFound {
    private Long id;
    private String first;
    private String second;
}
