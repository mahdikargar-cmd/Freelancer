package com.manage.freelancer.presentation.response.mainpage;

import com.manage.freelancer.domain.entity.mainpage.HeaderLink;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class HeaderDataResponse {
    private List<HeaderLink> links;
}
