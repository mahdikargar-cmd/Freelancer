package com.manage.freelancer.domain.entity.mainpage;

import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HeaderLink {
    private Long id;
    private String title;
    private Long titleId;
    private String link;

}
