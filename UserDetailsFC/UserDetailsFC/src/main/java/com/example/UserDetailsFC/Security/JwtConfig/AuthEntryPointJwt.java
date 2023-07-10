package com.example.UserDetailsFC.Security.JwtConfig;


import com.example.UserDetailsFC.RequestExceptionHandler.DuplicateUserExceptionHandler;
import com.example.UserDetailsFC.RequestExceptionHandler.LoginAuthenticationException;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class AuthEntryPointJwt implements AuthenticationEntryPoint {
    private static final Logger logger = LoggerFactory.getLogger(AuthEntryPointJwt.class);

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException)
            throws IOException, ServletException {

        logger.error(String.valueOf(authException));
        if (authException.getCause() instanceof DuplicateUserExceptionHandler) {
            String errorMessage = authException.getCause().getMessage();
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, errorMessage);
        }else if (authException.getCause() instanceof LoginAuthenticationException) {
            String errorMessage = authException.getCause().getMessage();
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, errorMessage);
        }else {
            System.out.println("authentrypointjwt");
            logger.error("Unauthorized error: {}", authException.getMessage());
            logger.error("Unauthorized error: {}", authException.getCause());
            logger.error("Unauthorized error: {}", authException.getStackTrace());
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Error: Unauthorized");
        }
    }
}
