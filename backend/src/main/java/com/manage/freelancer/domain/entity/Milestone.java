package com.manage.freelancer.domain.entity;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Embeddable
public class Milestone {
    private String name;
    private String description;
    private Double amount; // This appears to be the only field that's required
    private Integer durationDays;
}