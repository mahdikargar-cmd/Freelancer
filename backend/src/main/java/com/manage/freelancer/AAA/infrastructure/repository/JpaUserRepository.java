package com.manage.freelancer.AAA.infrastructure.repository;

import com.manage.freelancer.AAA.infrastructure.entity.UserDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface JpaUserRepository extends JpaRepository<UserDTO, Long> {
    Optional<UserDTO> findByEmail(String email);
    Optional<UserDTO> findById(Long id);
}
