package com.manage.freelancer.presentation.dto;

import com.manage.freelancer.domain.entity.HeaderLink;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class HeaderDataResponse {
    private List<HeaderLink> links;
}
