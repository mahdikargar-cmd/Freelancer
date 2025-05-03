package com.manage.freelancer.domain.entity;

import com.manage.freelancer.AAA.domain.model.User;
import com.manage.freelancer.AAA.infrastructure.entity.UserDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Project {
    private long id;
    private String subject;
    private String description;
    private double priceStarted;
    private double priceEnded;
    private List<Skills> skills;
    private Category category;
    private long suggested;
    private int deadline;
    private boolean active = false;
    private ProjectType type;
    private List<User> suggestions;
    private LocalDate createdDate;
    private LocalDate endDate;
    private ProjectStatus status;
    private User employerId;
}