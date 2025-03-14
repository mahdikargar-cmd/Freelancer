package com.manage.freelancer.domain.entity.mainpage;

import jakarta.persistence.Entity;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;

import java.util.List;


// domain/entity/mainpage/FooterLinkCategory.java (بدون وابستگی به JPA)
@Data
@Builder
public class FooterLinkCategory {
    private Long id;
    private String title;
    private List<FooterLink> links;
}