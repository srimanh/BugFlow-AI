package com.bugflow.bugflow_ai.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;

@Configuration
public class OpenApiConfig {
    @Bean
    public OpenAPI customOpenAPI() {
        final String securitySchemeName = "bearerAuth";
        return new OpenAPI()
             .info(new Info()
                        .title("BugFlow AI - API Docs")
                        .version("1.0")
                        .description("API documentation for BugFlow AI"));
            
    }
}