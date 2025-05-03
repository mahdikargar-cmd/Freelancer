package com.manage.freelancer.infrastructure.persistence.entityDTO;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.manage.freelancer.AAA.infrastructure.entity.UserDTO;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "project")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProjectDTO {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String subject;

    @Column(length = 1000)
    private String description;

    @Column(name = "price_started")
    private Double priceStarted;

    @Column(name = "price_ended")
    private Double priceEnded;

    private Integer deadline;

    @Column(name = "created_date")
    private LocalDate createdDate;

    @Column(name = "end_date")
    private LocalDate endDate;

    private String type;

    private String status;

    private boolean active;

    @Column(name = "suggested")
    private long suggested;

    @NotNull(message = "Employer ID cannot be null")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnoreProperties({"projects", "hibernateLazyInitializer", "handler"})
    private UserDTO employerId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private CategoryDTO category;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "project_skills",
            joinColumns = @JoinColumn(name = "project_id"),
            inverseJoinColumns = @JoinColumn(name = "skill_id")
    )
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private List<SkillDTO> skills = new ArrayList<>();

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "project_freelancers",
            joinColumns = @JoinColumn(name = "project_id"),
            inverseJoinColumns = @JoinColumn(name = "freelancer_id")
    )
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private List<UserDTO> suggestions = new ArrayList<>();


}