package com.manage.freelancer.infrastructure.persistence.mapper;

import com.manage.freelancer.domain.entity.ProfileInformation;
import com.manage.freelancer.infrastructure.persistence.entityDTO.ProfileInformationDTO;
import org.springframework.stereotype.Component;

@Component
public class ProfileInformationMapper {
    public ProfileInformation toDomain(ProfileInformationDTO profileInformationdto) {
        if (profileInformationdto == null) return null;
        return ProfileInformation.builder()
                .id(profileInformationdto.getId())
                .firstName(profileInformationdto.getFirstName())
                .lastName(profileInformationdto.getLastName())
                .phoneNumber(profileInformationdto.getPhoneNumber())
                .address(profileInformationdto.getAddress())
                .user(profileInformationdto.getUser())
                .placeOfStudy(profileInformationdto.getPlaceOfStudy())
                .profileImageUrl(profileInformationdto.getProfileImageUrl())
                .projectsPosted(profileInformationdto.getProjectsPosted())
                .activeProjects(profileInformationdto.getActiveProjects())
                .completedProjects(profileInformationdto.getCompletedProjects())
                .unreadMessages(profileInformationdto.getUnreadMessages())
                .notifications(profileInformationdto.getNotifications())
                .build();
    }

    public ProfileInformationDTO toDTO(ProfileInformation profileInformation) {
        if (profileInformation == null) return null;
        return ProfileInformationDTO.builder()
                .id(profileInformation.getId())
                .firstName(profileInformation.getFirstName())
                .lastName(profileInformation.getLastName())
                .phoneNumber(profileInformation.getPhoneNumber())
                .address(profileInformation.getAddress())
                .user(profileInformation.getUser())
                .placeOfStudy(profileInformation.getPlaceOfStudy())
                .profileImageUrl(profileInformation.getProfileImageUrl())
                .projectsPosted(profileInformation.getProjectsPosted())
                .activeProjects(profileInformation.getActiveProjects())
                .completedProjects(profileInformation.getCompletedProjects())
                .unreadMessages(profileInformation.getUnreadMessages())
                .notifications(profileInformation.getNotifications())
                .build();
    }
}
