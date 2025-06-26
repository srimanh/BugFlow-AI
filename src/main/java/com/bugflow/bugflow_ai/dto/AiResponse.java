package com.bugflow.bugflow_ai.dto;

public class AiResponse {
    private String suggestion;

    public AiResponse(String suggestion) {
        this.suggestion = suggestion;
    }

    public String getSuggestion() {
        return suggestion;
    }

    public void setSuggestion(String suggestion) {
        this.suggestion = suggestion;
    }
}
