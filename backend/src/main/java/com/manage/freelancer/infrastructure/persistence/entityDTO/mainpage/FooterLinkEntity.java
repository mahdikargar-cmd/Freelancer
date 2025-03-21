package com.manage.freelancer.infrastructure.persistence.entityDTO.mainpage;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "footer_links")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FooterLinkEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String url;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private FooterLinkCategoryEntity category;
}
