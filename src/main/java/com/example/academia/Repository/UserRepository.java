package com.example.academia.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.academia.model.Student;

public interface UserRepository extends JpaRepository<Student,Long> {
    boolean existsById(long id);
    Student findById(long id);

    boolean existsByEmailAndIdNot(String email, Long id);
    boolean existsByRollNoAndIdNot(String rollNo, Long id);

    int countByDomainId(long domainId);
}