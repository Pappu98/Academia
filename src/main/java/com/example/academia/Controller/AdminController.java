// AuthController.java
package com.example.academia.Controller;
import com.example.academia.model.Admin;
import com.example.academia.model.Student;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import com.example.academia.Repository.AdminRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@CrossOrigin(originPatterns = "http://localhost:*")
@RestController
public class AdminController {
    private final AdminRepository adminRepository; // Inject UserRepository

    @Autowired
    public AdminController(AdminRepository adminRepository) {
        this.adminRepository = adminRepository;
    }

    List<Admin> getAllAdmins() {
        return adminRepository.findAll();
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Admin admin) {
        //public String login(@RequestBody Admin admin) {
        List<Admin> lt = getAllAdmins();
        String username = admin.getUsername();
        String password = admin.getPassword();

//        System.out.print(lt);
//        for (int i = 0; i < lt.size(); i++) {
//            if (lt.get(i).getUsername().equals(username) && lt.get(i).getPassword().equals(password))
//                return "Login successful";
//        }
//        return "Login failed";
        Admin authenticatedAdmin = adminRepository.findByUsernameAndPassword(username, password);

        if (authenticatedAdmin != null) {
            return ResponseEntity.ok("Login Successful");
            //return "Yes";
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
            //return "No";
        }

        }
}
        // Perform authentication logic here (e.g., check credentials in database)
        // For demonstration purposes, we're just checking if the username and password are "admin"