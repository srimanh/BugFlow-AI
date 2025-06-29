package com.bugflow.bugflow_ai.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bugflow.bugflow_ai.dto.AiRequest;
import com.bugflow.bugflow_ai.dto.AiResponse;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin
public class AiController {

    @PostMapping("/suggest")
    public ResponseEntity<AiResponse> getSuggestion(@RequestBody AiRequest request) {
        // ✨ Mock AI logic
        String suggestion = "🔧 Try checking if your input validation is handled before processing the form.";
        return ResponseEntity.ok(new AiResponse(suggestion));
    }
}