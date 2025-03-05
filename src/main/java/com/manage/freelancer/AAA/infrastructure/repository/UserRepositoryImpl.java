package com.manage.freelancer.AAA.infrastructure.repository;

import com.manage.freelancer.AAA.domain.model.User;
import com.manage.freelancer.AAA.domain.repository.UserRepository;
import com.manage.freelancer.AAA.infrastructure.entity.UserEntity;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public class UserRepositoryImpl implements UserRepository {
    private final JpaUserRepository jpaUserRepository;

    public UserRepositoryImpl(JpaUserRepository jpaUserRepository) {
        this.jpaUserRepository = jpaUserRepository;
    }

    @Override
    public void save(User user) {
        UserEntity userEntity = new UserEntity();
        userEntity.setId(user.getId());
        userEntity.setEmail(user.getEmail());
        userEntity.setPassword(user.getPassword());
        jpaUserRepository.save(userEntity);
    }

    @Override
    public Optional<User> findByEmail(String email) {
        return jpaUserRepository.findByEmail(email)
                .map(userEntity -> new User(
                        userEntity.getId(),
                        userEntity.getEmail(),
                        userEntity.getPassword()
                ));
    }
}