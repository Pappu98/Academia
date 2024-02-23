package com.example.academia.Controller;

import com.example.academia.Repository.SpecializationRepository;
import com.example.academia.model.Domain;
import com.example.academia.model.Specialization;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;

import java.util.List;

@CrossOrigin(originPatterns = "http://localhost:*")
@RestController
public class SpecializationController {
    private final SpecializationRepository specializationRepository; // Inject UserRepository

    @Autowired
    public SpecializationController(SpecializationRepository specializationRepository) {
        this.specializationRepository=specializationRepository;
    }

    @GetMapping("/getspecializations")
    public ResponseEntity<List<Specialization>> getAllSpecializations() {
        List<Specialization> specializations = specializationRepository.findAll();
        return ResponseEntity.ok(specializations);
    }
}