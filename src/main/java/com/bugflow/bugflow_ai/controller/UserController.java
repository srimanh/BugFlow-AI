package com.bugflow.bugflow_ai.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bugflow.bugflow_ai.model.User;
import com.bugflow.bugflow_ai.repository.UserRepository;

@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @GetMapping("/role")
    public List<User> getUsersByRole(@RequestParam String role) {
        List<User> users = userRepository.findByRole(role);
        if (users.isEmpty() && !role.startsWith("ROLE_")) {
            users = userRepository.findByRole("ROLE_" + role);
        }
        return users;
    }

    @GetMapping("/all-nonmanagers")
    public List<User> getAllNonManagers() {
        List<User> all = userRepository.findAll();
        return all.stream()
            .filter(u -> !u.getRole().equalsIgnoreCase("ROLE_MANAGER"))
            .toList();
    }
    @GetMapping("/all")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}
