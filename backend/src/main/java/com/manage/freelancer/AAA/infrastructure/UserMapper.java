package com.manage.freelancer.AAA.infrastructure;


import com.manage.freelancer.AAA.domain.model.User;
import com.manage.freelancer.AAA.infrastructure.entity.UserDTO;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    public User toDomain(UserDTO userDTO) {
        if (userDTO == null) return null;

        return User.builder()
                .id(userDTO.getId())
                .email(userDTO.getEmail() != null ? userDTO.getEmail() : "Unknown")
                .password(userDTO.getPassword() != null ? userDTO.getPassword() : "Unknown")
                .role(userDTO.getRole())
                .rating(userDTO.getRating())
                .ratingCount(userDTO.getRatingCount())
                .phone(userDTO.getPhone())
                .createdAt(userDTO.getCreatedAt())
                .build();

    }


    public UserDTO toDTO(User user) {
        if (user == null) return null;

        return UserDTO.builder()
                .id(user.getId())
                .email(user.getEmail())
                .password(user.getPassword())
                .role(user.getRole())
                .rating(user.getRating())
                .ratingCount(user.getRatingCount())
                .phone(user.getPhone())
                .createdAt(user.getCreatedAt())
                .build();
    }
}
