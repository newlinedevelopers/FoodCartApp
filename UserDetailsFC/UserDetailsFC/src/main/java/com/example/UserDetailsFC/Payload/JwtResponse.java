package com.example.UserDetailsFC.Payload;

import lombok.Data;

import java.util.List;
@Data
public class JwtResponse {
    String jwt;
    Long userId;
    String username;
    Boolean isLoggedIn;
    List<String> roles;
    Boolean isProfile;
    public JwtResponse(String jwt, Boolean isLoggedIn, Long userId, Boolean isProfile, String username, List<String> roles) {
        this.jwt = jwt;
        this.isLoggedIn = isLoggedIn;
        this.userId = userId;
        this.username = username;
        this.isProfile = isProfile;
        this.roles = roles;
    }

}
