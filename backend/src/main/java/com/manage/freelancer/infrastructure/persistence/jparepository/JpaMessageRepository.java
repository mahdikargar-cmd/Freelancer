package com.manage.freelancer.infrastructure.persistence.jparepository;

import com.manage.freelancer.infrastructure.persistence.entityDTO.MessageDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JpaMessageRepository extends JpaRepository<MessageDTO, Long> {
    @Query("SELECT m FROM MessageDTO m WHERE m.projectId.id = :projectId ORDER BY m.time ASC")
    List<MessageDTO> findAllByProjectId_IdOrderByTimeAsc(@Param("projectId") Long projectId);

    }