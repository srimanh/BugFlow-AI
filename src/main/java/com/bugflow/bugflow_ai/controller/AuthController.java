package com.bugflow.bugflow_ai.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bugflow.bugflow_ai.config.JwtUtil;
import com.bugflow.bugflow_ai.dto.LoginRequest;
import com.bugflow.bugflow_ai.model.User;
import com.bugflow.bugflow_ai.service.UserService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class AuthController {

    @Autowired private UserService userService;
    @Autowired private JwtUtil jwtUtil;
    @Autowired private PasswordEncoder passwordEncoder;

    /** Register */
    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody User user) {
        return ResponseEntity.ok(userService.register(user));
    }

    /** Login */
   @PostMapping("/login")
public ResponseEntity<?> login(@RequestBody LoginRequest req) {
    System.out.println("LOGIN ENDPOINT HIT: " + req.getEmail());
    var user = userService.findByEmail(req.getEmail());
    System.out.println("User found: " + user);
    if (user == null || !passwordEncoder.matches(req.getPassword(), user.getPassword())) {
        System.out.println("Invalid credentials");
        return ResponseEntity.status(401).body("Invalid credentials");
    }
    String token = jwtUtil.generateToken(user.getEmail());
    System.out.println("Token generated: " + token);
    return ResponseEntity.ok(new AuthResponse(token, user.getRole()));
}}