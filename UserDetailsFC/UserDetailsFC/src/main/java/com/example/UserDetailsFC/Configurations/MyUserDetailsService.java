package com.example.UserDetailsFC.Configurations;

import com.example.UserDetailsFC.Entities.UserCredentials;
import com.example.UserDetailsFC.Repositories.UserCredentialsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class MyUserDetailsService implements UserDetailsService {
    @Autowired
    public UserCredentialsRepository userCredentialsRepository;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserCredentials userCredentials = userCredentialsRepository.getUserByUsername(username);
        if(userCredentials == null){
            throw new UsernameNotFoundException("User not exist for this email id: " + username);
        }
        return new MyUserDetails(userCredentials);
    }
}
