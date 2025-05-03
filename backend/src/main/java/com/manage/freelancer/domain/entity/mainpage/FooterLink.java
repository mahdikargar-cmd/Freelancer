package com.manage.freelancer.domain.entity.mainpage;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FooterLink {


    private Long id;
    private String name;
    private String url;
    private Long categoryId;
}
