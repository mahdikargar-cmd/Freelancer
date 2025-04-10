package com.manage.freelancer.domain.entity;

import com.manage.freelancer.AAA.domain.model.User;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
public class SuggestProject {
    private Long id;
    private Project projectId;
    private User freelancerId;
    private String title;
    private String content;
    private Double proposedBudget; //بودجه پیشنهادی
    private Integer estimatedDuration; // مدت زمان تخمینی انجام پروژه (به روز)
    private LocalDateTime submittedAt;
    private SuggestStatus status;
    private List<Milestone> milestones; // لیست بخش‌های پروژه

}
