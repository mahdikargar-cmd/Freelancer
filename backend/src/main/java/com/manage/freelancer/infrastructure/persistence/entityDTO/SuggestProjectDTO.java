package com.manage.freelancer.infrastructure.persistence.entityDTO;

import com.manage.freelancer.AAA.infrastructure.entity.UserDTO;
import com.manage.freelancer.domain.entity.Milestone;
import com.manage.freelancer.domain.entity.SuggestStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "suggestProject")
@Builder
public class SuggestProjectDTO {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "project_id")
    private ProjectDTO projectId;

    @ManyToOne
    @JoinColumn(name = "freelancer_id")
    private UserDTO freelancerId;

    private String title;
    private String content;
    private Double proposedBudget;
    private Integer estimatedDuration;

    @Column(name = "created_date")
    private LocalDateTime submittedAt;

    @Enumerated(EnumType.STRING)
    private SuggestStatus status;

    @ElementCollection
    @CollectionTable(name = "suggest_project_milestones", joinColumns = @JoinColumn(name = "suggest_project_id"))
    @Column(nullable = false)
    private List<Milestone> milestones;

    @PrePersist
    public void prePersist() {
        if (this.submittedAt == null) {
            this.submittedAt = LocalDateTime.now();
        }
    }
}