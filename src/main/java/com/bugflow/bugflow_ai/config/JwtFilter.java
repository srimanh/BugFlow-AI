package com.bugflow.bugflow_ai.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.bugflow.bugflow_ai.repository.UserRepository;

import jakarta.servlet.FilterChain;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtFilter extends OncePerRequestFilter {

    @Autowired private JwtUtil jwtUtil;
    @Autowired private UserRepository userRepository;

    /** Skip public auth endpoints */
@Override
protected boolean shouldNotFilter(HttpServletRequest request) {
    String path = request.getRequestURI();
    return path.startsWith("/api/auth")
        || path.startsWith("/v3/api-docs")
        || path.startsWith("/swagger-ui");
}

    @Override
    protected void doFilterInternal(
            HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws java.io.IOException, jakarta.servlet.ServletException {

        String header = request.getHeader("Authorization");
        if (header != null && header.startsWith("Bearer ")) {
            try {
                String token = header.substring(7);
                String email = jwtUtil.extractEmail(token);

                if (email != null && jwtUtil.validateToken(token)) {
                    var userOpt = userRepository.findByEmail(email);
                    userOpt.ifPresent(user -> {
                        var details = new CustomUserDetails(user);
                        var auth = new UsernamePasswordAuthenticationToken(
                                details, null, details.getAuthorities());
                        SecurityContextHolder.getContext().setAuthentication(auth);
                    });
                }
            } catch (Exception e) {
                // Log and skip authentication if token is invalid
                System.out.println("JWT error: " + e.getMessage());
            }
        }
        chain.doFilter(request, response);
    }
}