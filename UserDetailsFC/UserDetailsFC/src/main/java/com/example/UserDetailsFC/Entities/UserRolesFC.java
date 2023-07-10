package com.example.UserDetailsFC.Entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserRolesFC {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true)
    private String role;

    @OneToMany(mappedBy = "userRolesFC")
    private List<UserCredentials> userCredentials;

    @Override
    public String toString() {
        return "MyObject{" +
                "id=" + id +
                ", name='" + role +
                '}';
    }

}
