package com.example.UserDetailsFC.Models;

import com.example.UserDetailsFC.Entities.UserCredentials;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserRolesModel {
    private Long id;
    private String role;
    private List<UserCredentials> userCredentials;
}
