package com.example.academia.Controller;

import com.example.academia.Repository.DomainRepository;
import com.example.academia.model.Domain;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;

import java.util.List;

@CrossOrigin(originPatterns = "http://localhost:*")
@RestController
public class DomainController {
    private final DomainRepository domainRepository; // Inject UserRepository

    @Autowired
    public DomainController(DomainRepository domainRepository) {
        this.domainRepository = domainRepository;
    }

   @GetMapping("/getdomains")
   public ResponseEntity<List<Domain>> getAllAdmins() {
       List<Domain> domains = domainRepository.findAll();
       return ResponseEntity.ok(domains);
   }
}