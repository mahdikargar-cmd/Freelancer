package com.manage.freelancer.AAA.infrastructure.repository;

import com.manage.freelancer.AAA.infrastructure.entity.UserDTO;
import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class UserRepositoryImpl implements UserRepository {
    private final JpaUserRepository jpaUserRepository;
    @PersistenceContext
    private EntityManager em;

    public UserRepositoryImpl(JpaUserRepository jpaUserRepository) {
        this.jpaUserRepository = jpaUserRepository;
    }

    @Override
    public void save(UserDTO user) {
        jpaUserRepository.save(user);
    }

    @Override
    public Optional<UserDTO> findByEmail(String email) {
        try {
            UserDTO user = em.createQuery("SELECT u FROM UserDTO u WHERE u.email = :email", UserDTO.class)
                    .setParameter("email", email)
                    .getSingleResult();
            return Optional.of(user);
        } catch (NoResultException e) {
            return Optional.empty();
        }
    }
    @Override
    public Optional<UserDTO> findById(Long id) {
        return jpaUserRepository.findById(id);
    }
    @Override
    public Optional<UserDTO> findByUsername(String email) {
        try {
            UserDTO user = em.createQuery("SELECT u FROM UserDTO u WHERE u.email = :email", UserDTO.class)
                    .setParameter("email", email)
                    .getSingleResult();
            return Optional.of(user);
        } catch (NoResultException e) {
            return Optional.empty();
        }
    }

    @Override
    public List<UserDTO> findFreelancersByProjectId(Long projectId) {
        return List.of();
    }

    @Override
    public List<UserDTO> findAll() {
        return jpaUserRepository.findAll();
    }
}