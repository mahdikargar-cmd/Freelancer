package com.manage.freelancer.presentation.response.mainpage;

import com.manage.freelancer.domain.entity.mainpage.FooterLinkCategory;
import com.manage.freelancer.domain.entity.mainpage.SocialLink;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class FooterDataResponse {
    private List<FooterLinkCategory> footerLinks;
    private List<SocialLink> socialLinks;
}