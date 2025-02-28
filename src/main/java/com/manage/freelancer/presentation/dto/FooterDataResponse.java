package com.manage.freelancer.presentation.dto;

import com.manage.freelancer.domain.entity.FooterLinkCategory;
import com.manage.freelancer.domain.entity.SocialLink;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class FooterDataResponse {
    private List<FooterLinkCategory> footerLinks;
    private List<SocialLink> socialLinks;
}