package com.manage.freelancer.AAA.infrastructure.repository;

import com.manage.freelancer.AAA.domain.model.User;
import com.manage.freelancer.AAA.infrastructure.entity.UserDTO;

import java.util.Optional;

public interface UserRepository {
    void save(UserDTO  user);
    Optional<UserDTO> findByEmail(String name);
    Optional<UserDTO> findById(Long id);
}