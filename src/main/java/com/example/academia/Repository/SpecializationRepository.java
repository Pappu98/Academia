package com.example.academia.Repository;

import com.example.academia.model.Domain;
import com.example.academia.model.Specialization;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SpecializationRepository extends  JpaRepository<Specialization, Integer> {
}