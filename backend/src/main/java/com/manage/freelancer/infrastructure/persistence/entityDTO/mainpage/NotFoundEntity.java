package com.manage.freelancer.infrastructure.persistence.entityDTO.mainpage;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="notfound")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class NotFoundEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String first;

    @Column(nullable = false)
    private String second;
}
