package com.bugflow.bugflow_ai.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.bugflow.bugflow_ai.model.User;
import com.bugflow.bugflow_ai.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    /** Register a new user */
    public User register(User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Email already exists");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        // Ensure role is stored as ROLE_MANAGER, ROLE_DEVELOPER, etc.
        user.setRole("ROLE_" + user.getRole().toUpperCase());
        return userRepository.save(user);
    }

    /** Find by email */
    public User findByEmail(String email) {
        return userRepository.findByEmail(email).orElse(null);
    }
}
