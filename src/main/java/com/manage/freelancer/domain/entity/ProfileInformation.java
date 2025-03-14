package com.manage.freelancer.domain.entity;
import com.manage.freelancer.AAA.infrastructure.entity.UserEntity;
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
    private UserEntity user;
}
