package com.manage.freelancer.infrastructure.persistence.entityDTO;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.manage.freelancer.AAA.infrastructure.entity.UserDTO;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@Table(name = "message")
@Builder
@NoArgsConstructor
@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class MessageDTO {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "sender_id")
    private UserDTO sender;

    private String content;

    @Column(name = "time")
    private LocalDateTime time;

    @ManyToOne
    @JoinColumn(name = "project_id")
    private ProjectDTO projectId;
}