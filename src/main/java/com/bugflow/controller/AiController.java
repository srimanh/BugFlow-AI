package com.bugflow.controller;

import com.bugflow.dto.AiRequest;
import com.bugflow.dto.AiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin
public class AiController {

    @PostMapping("/suggest")
    public ResponseEntity<AiResponse> getSuggestion(@RequestBody AiRequest request) {
        // 🔮 Mock response (replace with OpenAI logic later)
        String suggestion = "🔧 Try checking if your input validation is handled before processing the form.";
        
        return ResponseEntity.ok(new AiResponse(suggestion));
    }
}
