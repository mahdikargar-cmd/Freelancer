package com.manage.freelancer.infrastructure.persistence.entity.mainpage;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "social_links")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SocialLinkEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String icon;

    @Column(nullable = false)
    private String url;
}