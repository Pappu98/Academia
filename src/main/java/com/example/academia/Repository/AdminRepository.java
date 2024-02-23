package com.example.academia.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.academia.model.Admin;

public interface AdminRepository extends JpaRepository<Admin, String> {
    //Admin findByUsername(String username);
    Admin findByUsernameAndPassword(String username, String password);
}