package com.manage.freelancer.AAA.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private static final Logger logger = LoggerFactory.getLogger(JwtAuthenticationFilter.class);
    private final JwtService jwtService;
    private final UserDetailsService userDetailsService; // For regular users
    private final AdminDetailsService adminDetailsService; // For admins

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        String path = request.getRequestURI();

        // مستثنی کردن مسیرهای permitAll
        if (
                path.startsWith("/auth/") ||
                path.startsWith("/api/profileImages/") ||
                path.startsWith("/api/getHeader") ||
                path.startsWith("/api/footer") ||
                path.startsWith("/api/notfound") ||
                path.startsWith("/api/placeholder/") ||
                path.startsWith("/admin/auth/")) {
            logger.debug("Skipping JWT validation for path: {}", path);
            filterChain.doFilter(request, response);
            return;
        }

        String jwt = extractToken(request);
        String username = null;

        if (jwt != null) {
            try {
                username = jwtService.extractUsername(jwt);
                logger.debug("Extracted username from JWT: {}", username);
            } catch (Exception e) {
                logger.error("Invalid JWT token: {}", e.getMessage());
            }
        }

        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = null;

            try {
                userDetails = userDetailsService.loadUserByUsername(username);
                logger.debug("User found in users table: {}", username);
            } catch (UsernameNotFoundException e) {
                logger.debug("User not found in users table, trying admins: {}", username);
            }

            if (userDetails == null) {
                try {
                    userDetails = adminDetailsService.loadUserByUsername(username);
                    logger.debug("User found in admins table: {}", username);
                } catch (UsernameNotFoundException e) {
                    logger.error("User not found in admins table: {}", username);
                }
            }

            if (userDetails != null && jwtService.isTokenValid(jwt, userDetails)) {
                UsernamePasswordAuthenticationToken authToken =
                        new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authToken);
                logger.debug("Authenticated user: {}", username);
            } else {
                logger.warn("JWT token validation failed for username: {}", username);
            }
        } else if (jwt != null) {
            logger.warn("No username found in JWT or user already authenticated");
        }

        filterChain.doFilter(request, response);
    }

    private String extractToken(HttpServletRequest request) {
        // Check Authorization header
        String authHeader = request.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            logger.debug("Extracted token from Authorization header: {}", token);
            return token;
        }

        // Check query parameter token
        String token = request.getParameter("token");
        if (token != null && !token.isEmpty()) {
            logger.debug("Extracted token from query parameter: {}", token);
            return token;
        }

        logger.debug("No token found in request");
        return null;
    }
}