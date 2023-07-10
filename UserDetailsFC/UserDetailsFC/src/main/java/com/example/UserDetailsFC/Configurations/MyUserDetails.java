package com.example.UserDetailsFC.Configurations;

import com.example.UserDetailsFC.Entities.UserCredentials;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Arrays;
import java.util.Collection;

public class MyUserDetails implements UserDetails{
    public UserCredentials userCredentials;

    public MyUserDetails(UserCredentials userCredentials){
        this.userCredentials = userCredentials;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        SimpleGrantedAuthority simpleGrantedAuthority = new SimpleGrantedAuthority(userCredentials.getUserRolesFC().getRole());
        return Arrays.asList(simpleGrantedAuthority);
    }
    public Long getUserId() {
        return userCredentials.getId();
    }

    @Override
    public String getPassword() {
        return String.valueOf(userCredentials.getPassword());
    }

    @Override
    public String getUsername() {
        return userCredentials.getUsername();
    }

    @Override
    public boolean isAccountNonExpired() {
        return userCredentials.getIsAccountNonExpired();
    }

    @Override
    public boolean isAccountNonLocked() {
        return userCredentials.getIsAccountNonLocked();
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return userCredentials.getIsCredentialsNonExpired();
    }

    @Override
    public boolean isEnabled() {
        return userCredentials.getIsEnabled();
    }

    public Boolean getLoggedIn() {
        return true;
    }
    public Boolean getProfile() {
        if(userCredentials.getUserAddressDetails() == null){
            return false;
        }
        return true;
    }
}
