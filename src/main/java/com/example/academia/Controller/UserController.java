package com.example.academia.Controller;

import java.util.*;


import com.example.academia.Repository.AdminRepository;
import com.example.academia.model.Admin;
import com.example.academia.model.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import com.example.academia.Repository.UserRepository;

@CrossOrigin(originPatterns = "http://localhost:*")
@RestController
public class UserController {
    private final UserRepository userRepository; // Inject UserRepository

    @Autowired
    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/exist")
    public ResponseEntity<?> exist(@RequestBody Student student) {
        long id = student.getId();
        if (userRepository.existsById(id)) {
            return ResponseEntity.ok("ID Found");
            //return "Yes";
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("ID Not Found");
            //return "No";
        }
    }

    @GetMapping("/student/{id}")
    public ResponseEntity<Student> getUserById(@PathVariable long id) {
        Student student = userRepository.findById(id);
        return ResponseEntity.ok(student);
    }

    private boolean containsNumbers(String input) {
        return input != null && input.matches(".*\\d.*");
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateStudent(@RequestBody Student newStudent, @PathVariable long id) {
        Student student = userRepository.findById(id);
        student.setFirst_name(newStudent.getFirst_name());
        student.setLast_name(newStudent.getLast_name());
        student.setEmail(newStudent.getEmail());
        student.setCgpa(newStudent.getCgpa());
        student.setAddress(newStudent.getAddress());
        student.setRollNo(newStudent.getRollNo());
        student.setAdmissionYear(newStudent.getAdmissionYear());
        student.setGraduation_year(newStudent.getGraduation_year());
        student.setDomain(newStudent.getDomain());
        student.setPhotograph_path(newStudent.getPhotograph_path());
        student.setTotalCredits(newStudent.getTotalCredits());
        student.setSpecialization(newStudent.getSpecialization());

        if (!checkValidRollNo(student.getDomain().getId(), student.getAdmissionYear(), student.getRollNo()))
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid Roll Number.");

        if (student.getFirst_name().length() == 0 || student.getLast_name().length() == 0)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Name should not be NULL.");

        if (student.getFirst_name().contains(" ") || student.getLast_name().contains(" "))
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Name should not contain space.");

        if (student.getEmail().contains(" "))
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email should not contain space.");

        if (student.getEmail().length() == 0)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email should not be NULL.");

        int currentCapacity = userRepository.countByDomainId(student.getDomain().getId());
        if (currentCapacity >= student.getDomain().getCapacity()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Domain is having full capacity.");
        }
        if (userRepository.existsByEmailAndIdNot(student.getEmail(), id)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email already exists in the database.");
        }
        else if (userRepository.existsByRollNoAndIdNot(student.getRollNo(), id)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Roll Number already exists in the database.");
        }
        else if (containsNumbers(student.getFirst_name()) || containsNumbers(student.getLast_name())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Name should not contain digits.");
        } else if (student.getSpecialization().getCreditsRequired() > student.getTotalCredits())
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Student does not have the required credits for the specialization.");
        else
            userRepository.save(student);
        return ResponseEntity.ok("Student Updated");
    }

    public boolean checkValidRollNo(long domainId, int admissionYear, String rollNo) {
        String str = "";
        String cpyRollNo = rollNo;
        if (domainId == 1)
            str = "MTCSE";
        else if (domainId == 2)
            str = "MTECE";
        else if (domainId == 3)
            str = "IMTCSE";
        else
            str = "IMTECE";
        String domainPlusAdmissionYear = str.concat(Integer.toString(admissionYear));
        String strReplace = cpyRollNo.replace(domainPlusAdmissionYear, "");

        if (rollNo.startsWith(domainPlusAdmissionYear) && strReplace.matches("-?\\d+(\\.\\d+)?"))
            return true;
        else
            return false;
    }
}