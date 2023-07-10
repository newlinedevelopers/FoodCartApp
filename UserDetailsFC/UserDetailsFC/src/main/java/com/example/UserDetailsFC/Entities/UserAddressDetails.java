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
public class UserAddressDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String firstname;
    private String lastname;
    @Column(nullable = false)
    private String primary_mobile_number;
    private String secondary_mobile_number;
    private String country;
    private String state;
    @Column(nullable = false)
    private String city;
    @Column(nullable = false)
    private String street;
    @Column(nullable = false)
    private String postal_code;

    @OneToMany(mappedBy = "userAddressDetails")
    private List<UserCredentials> userCredentials;

    @Override
    public String toString() {
        return "MyObject{" +
                "id=" + id +
                ", firstname='" + firstname +
                ", lastname='" + lastname +
                ", primary_mobile_number='" + primary_mobile_number +
                ", secondary_mobile_number='" + secondary_mobile_number +
                ", country='" + country +
                ", state='" + state +
                ", city='" + city +
                ", street='" + street +
                ", postal_code='" + postal_code +
                '}';
    }
}
