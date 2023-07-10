package com.example.UserDetailsFC.Repositories;

import com.example.UserDetailsFC.Entities.UserAddressDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserAddressDetailsRepository extends JpaRepository<UserAddressDetails, Long> {
    //@Query(value = "select address.firstname, address.lastname, address.primary_mobile_number, address.secondary_mobile_number, address.country, address.state as region, address.city, address.street, address.postal_code from UserAddressDetails address where address.id = ?1")
    @Query(value = "select address from UserAddressDetails address where address.id = ?1")
    UserAddressDetails getAddressById(Long userId);
}
