package com.manage.freelancer.presentation.response;

import com.manage.freelancer.domain.entity.ProfileInformation;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ProfileInformationResponse {
    private ProfileInformation profileInformation;

}
