package com.manage.freelancer.domain.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FooterLinkCategory {
    private Long id;
    private String title;
    private List<FooterLink> links;

}
