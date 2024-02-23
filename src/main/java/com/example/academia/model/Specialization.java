package com.example.academia.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Specialization {

    @Id
    private int id;
    private String specializationName;

    private int creditsRequired;

    public String getSpecializationName() {
        return specializationName;
    }

    public void setSpecializationName(String specializationName) {
        this.specializationName = specializationName;
    }

    public int getCreditsRequired() {
        return creditsRequired;
    }

    public void setCreditsRequired(int creditsRequired) {
        this.creditsRequired = creditsRequired;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }
}