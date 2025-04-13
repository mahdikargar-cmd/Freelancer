package com.manage.freelancer.infrastructure.persistence.entityDTO;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.manage.freelancer.AAA.infrastructure.entity.UserDTO;
import com.manage.freelancer.domain.entity.ProjectStatus;
import com.manage.freelancer.domain.entity.ProjectType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "project")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProjectDTO {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false)
    private String subject;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private double priceStarted;

    @Column(nullable = false)
    private double priceEnded;

    // تغییر حالت بارگذاری از EAGER به LAZY برای skills
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "project_skills",
            joinColumns = @JoinColumn(name = "project_id"),
            inverseJoinColumns = @JoinColumn(name = "skill_id")
    )
    private List<SkillDTO> skills;

    // تغییر حالت بارگذاری از EAGER به LAZY برای category
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false)
    private CategoryDTO category;

    private long suggested;

    @Column(nullable = false)
    private int deadline;

    @Column(nullable = false)
    private boolean active = false;

    @Column(nullable = false)
    private ProjectType type;

    private List<String> suggestions;
    private LocalDate createdDate;
    private LocalDate endDate;

    @Column(nullable = false)
    private ProjectStatus status;

    // تغییر حالت بارگذاری از EAGER به LAZY برای employerId
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private UserDTO employerId;
}
