package com.example.UserDetailsFC.Entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DialectOverride;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserCredentials {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, unique = true)
    private String username;
    @Column(nullable = false)
    private char[] password;
    @Column(columnDefinition = "number(1,0)")
    private Boolean isAccountNonExpired;
    @Column(columnDefinition = "number(1,0)")
    private Boolean isAccountNonLocked;
    @Column(columnDefinition = "number(1,0)")
    private Boolean isEnabled;
    @Column(columnDefinition = "number(1,0)")
    private Boolean isCredentialsNonExpired;
    @ManyToOne
    @JoinColumn(name = "address_id")
    private UserAddressDetails userAddressDetails;
    @ManyToOne
    @JoinColumn(name = "role_id")
    private UserRolesFC userRolesFC;

}