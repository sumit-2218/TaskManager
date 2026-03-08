package com.sumit.taskmanager.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.sumit.taskmanager.model.User;
import com.sumit.taskmanager.repository.UserRepository;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepo;

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    // Register new user
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody User user) {
        if (userRepo.findByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Email already exists");
        }

        // Hash the password before saving
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        // 🔥 Set role (default USER if not provided)
        if (user.getRole() == null || user.getRole().isEmpty()) {
            user.setRole("USER");
        }

        // Save user (includes phone, address, and role)
        userRepo.save(user);

        return ResponseEntity.ok("Registration successful");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        Optional<User> found = userRepo.findByEmail(user.getEmail());
        if (found.isPresent() && passwordEncoder.matches(user.getPassword(), found.get().getPassword())) {
            return ResponseEntity.ok(found.get());
        }
        return ResponseEntity.status(401).body("Invalid email or password");
    }
}