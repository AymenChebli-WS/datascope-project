package com.datascope.datascopebackend.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "offer")
public class Offer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "email")
    private String email;

    @ElementCollection
    @CollectionTable(name = "offer_skills", joinColumns = @JoinColumn(name = "offer_id"))
    @Column(name = "skill")
    private List<String> skills;

    @Column(name = "enterprise")
    private String enterprise;

    @Column(name = "type")
    private String type;

    @ElementCollection
    @CollectionTable(name = "offer_tasks", joinColumns = @JoinColumn(name = "offer_id"))
    @Column(name = "task")
    private List<String> tasks;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
