package com.bugflow.bugflow_ai.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.bugflow.bugflow_ai.dto.AiRequest;
import com.bugflow.bugflow_ai.dto.AiResponse;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin
public class AiController {

    @Value("${openrouter.api.key}")
    private String openRouterApiKey;

    @PostMapping("/suggest")
    public ResponseEntity<AiResponse> getSuggestion(@RequestBody AiRequest request) {
        String prompt = "You are an expert software engineer. "
            + "Given the following bug title and description, suggest a possible root cause or debugging step in simple language.\n\n"
            + "Title: " + request.getTitle() + "\n"
            + "Description: " + request.getDescription() + "\n\n"
            + "Suggestion:";
        try {
            String suggestion = callOpenRouter(prompt);
            return ResponseEntity.ok(new AiResponse(suggestion));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(502).body(new AiResponse("Failed to get AI suggestion. Please try again later. (OpenRouter)"));
        }
    }

    private String callOpenRouter(String prompt) throws Exception {
        String apiUrl = "https://openrouter.ai/api/v1/chat/completions";
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", "Bearer " + openRouterApiKey);

        Map<String, Object> body = new HashMap<>();
        body.put("model", "meta-llama/llama-3-8b-instruct:nitro");
        List<Map<String, String>> messages = new ArrayList<>();
        messages.add(Map.of("role", "user", "content", prompt));
        body.put("messages", messages);

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(body, headers);
        ResponseEntity<Map> response = restTemplate.postForEntity(apiUrl, request, Map.class);
        if (!response.getStatusCode().is2xxSuccessful()) {
            throw new RuntimeException("OpenRouter API error: " + response.getStatusCode());
        }
        Map<String, Object> respBody = response.getBody();
        if (respBody == null || !respBody.containsKey("choices")) {
            throw new RuntimeException("No choices in OpenRouter response");
        }
        List choices = (List) respBody.get("choices");
        if (choices.isEmpty()) {
            throw new RuntimeException("No choices returned from OpenRouter");
        }
        Map choice = (Map) choices.get(0);
        Map message = (Map) choice.get("message");
        String content = (String) message.get("content");
        return content != null ? content.trim() : "No suggestion returned.";
    }
}