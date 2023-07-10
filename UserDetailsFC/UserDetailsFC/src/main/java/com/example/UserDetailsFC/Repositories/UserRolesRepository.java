package com.example.UserDetailsFC.Repositories;

import com.example.UserDetailsFC.Entities.UserRolesFC;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRolesRepository extends JpaRepository<UserRolesFC, Long> {
    @Query(value = "select ur from UserRolesFC ur where ur.role = ?1")
    UserRolesFC findByRole(String user);
}
