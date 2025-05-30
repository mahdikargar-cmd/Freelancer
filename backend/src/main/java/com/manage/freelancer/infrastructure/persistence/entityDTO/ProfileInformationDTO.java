package com.manage.freelancer.infrastructure.persistence.entityDTO;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.manage.freelancer.AAA.infrastructure.entity.UserDTO;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "profile_information")
@Builder
public class ProfileInformationDTO {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String profileImageUrl;
    private String address;
    private String placeOfStudy;

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id", unique = true)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private UserDTO user;

    private Long projectsPosted = 0L;
    private Long activeProjects = 0L;
    private Long completedProjects = 0L;
    private Long unreadMessages = 0L;
    private Long notifications = 0L;

}
