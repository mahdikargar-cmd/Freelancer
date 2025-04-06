package com.manage.freelancer.infrastructure.persistence.entityDTO;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.util.ArrayList;
import java.util.Date;

public class ProjectDTO {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private static String subject;
    private static String description;
    private static String priceStarted;
    private static String priceEnded;
    private ArrayList<String> skills;
    private String category;
    private long suggested;
    private int deadline;
    private Date startDate;
    private Date endDate;
    private String Type;
}
