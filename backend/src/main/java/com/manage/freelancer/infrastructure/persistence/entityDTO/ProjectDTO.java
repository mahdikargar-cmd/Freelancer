/*
package com.manage.freelancer.infrastructure.persistence.entityDTO;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.manage.freelancer.AAA.infrastructure.entity.UserDTO;
import com.manage.freelancer.domain.entity.Category;
import com.manage.freelancer.domain.entity.ProjectStatus;
import com.manage.freelancer.domain.entity.ProjectType;
import com.manage.freelancer.domain.entity.Skills;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

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


    @ManyToOne
    @JoinColumn(name = "skill_id") // این اختیاریه ولی بهتره اضافه کنی
    @ElementCollection
    private List<SkillDTO> skills;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private CategoryDTO category;

    private long suggested; // تعداد پیشنهادهای ثبت‌شده

    @Column(nullable = false)
    private int deadline; // تعداد روزها یا ساعات (بر اساس تعریف)


    @Column(nullable = false)
    private ProjectType type;

    private List<String> suggestions;
    private LocalDate createdDate;
    private LocalDate endDate;

    @Column(nullable = false)
    private ProjectStatus status;


    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private UserDTO employerId;
}
*/
