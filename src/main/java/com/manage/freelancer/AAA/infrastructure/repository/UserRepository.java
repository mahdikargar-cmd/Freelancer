package com.manage.freelancer.AAA.infrastructure.repository;

import com.manage.freelancer.AAA.domain.model.User;
import java.util.Optional;

public interface UserRepository {
    void save(User user);
    Optional<User> findByEmail(String name);
}