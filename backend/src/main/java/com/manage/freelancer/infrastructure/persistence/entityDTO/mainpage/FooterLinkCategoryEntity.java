package com.manage.freelancer.infrastructure.persistence.entityDTO.mainpage;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "footer_link_categories")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FooterLinkCategoryEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String title;

    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<FooterLinkEntity> links = new ArrayList<>();

}
