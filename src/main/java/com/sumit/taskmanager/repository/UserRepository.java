package com.sumit.taskmanager.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sumit.taskmanager.model.User;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);

    // Check if a user exists by email
    boolean existsByEmail(String email);
}