package com.manage.freelancer.infrastructure.persistence.entityDTO.mainpage;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "header")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HeaderLinkEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private Long titleId; // تغییر به Long

    @Column(nullable = false)
    private String link;
}