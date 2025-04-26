        package com.manage.freelancer.AAA.infrastructure.repository;

import com.manage.freelancer.AAA.infrastructure.entity.UserDTO;

import java.util.List;
import java.util.Optional;

public interface UserRepository {
    void save(UserDTO user);
    Optional<UserDTO> findByEmail(String email);
    Optional<UserDTO> findById(Long id);
    Optional<UserDTO> findByUsername(String username);

    List<UserDTO> findFreelancersByProjectId(Long projectId);

    List<UserDTO> findAll();
}
