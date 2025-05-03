package com.manage.freelancer.domain.entity;

import com.manage.freelancer.AAA.infrastructure.entity.UserDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProfileInformation {
    private Long id;
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String profileImageUrl;
    private String address;
    private String placeOfStudy;
    private UserDTO user;

    private Long projectsPosted = 0L;
    private Long activeProjects = 0L;
    private Long completedProjects = 0L;
    private Long unreadMessages = 0L;
    private Long notifications = 0L;
}
