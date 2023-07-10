package com.example.UserDetailsFC.Service;

import com.example.UserDetailsFC.Configurations.MyUserDetails;
import com.example.UserDetailsFC.Entities.UserAddressDetails;
import com.example.UserDetailsFC.Entities.UserCredentials;
import com.example.UserDetailsFC.Entities.UserRolesFC;
import com.example.UserDetailsFC.Models.UserAddressModel;
import com.example.UserDetailsFC.Models.UserCredentialsModel;
import com.example.UserDetailsFC.Payload.JwtResponse;
import com.example.UserDetailsFC.Repositories.UserAddressDetailsRepository;
import com.example.UserDetailsFC.Repositories.UserCredentialsRepository;
import com.example.UserDetailsFC.Repositories.UserRolesRepository;
import com.example.UserDetailsFC.RequestExceptionHandler.DuplicateUserExceptionHandler;
import com.example.UserDetailsFC.RequestExceptionHandler.LoginAuthenticationException;
import com.example.UserDetailsFC.Security.JwtConfig.JwtUtils;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.nio.CharBuffer;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class UserDetailsService {
    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    ModelMapper modelMapper;
    @Autowired
    UserAddressDetailsRepository userAddressDetailsRepository;
    @Autowired
    private UserCredentialsRepository userCredentialsRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private UserRolesRepository userRolesRepository;
    @Autowired
    JwtUtils jwtUtils;
    public ResponseEntity<?> createUserCredentials(UserCredentialsModel userCredentialsModel) {
        if (userCredentialsRepository.getUserByUsername(userCredentialsModel.getUsername()) != null) {
                throw new DuplicateUserExceptionHandler("Email is already in use!");
        }

        UserRolesFC userRole = userRolesRepository.findByRole("USER");
        UserCredentials userCredentials = new UserCredentials();
        userCredentials.setUsername(userCredentialsModel.getUsername());
        userCredentials.setPassword((passwordEncoder.encode(CharBuffer.wrap(userCredentialsModel.getPassword()))).toCharArray());
        userCredentials.setIsEnabled(true);
        userCredentials.setIsAccountNonExpired(true);
        userCredentials.setIsCredentialsNonExpired(true);
        userCredentials.setIsAccountNonLocked(true);
        userCredentials.setUserRolesFC(userRole);
        userCredentialsRepository.save(userCredentials);
        return ResponseEntity.ok().body("User Credentials Created Successfully");
    }

    public ResponseEntity<?> verifyUserCredentials(UserCredentialsModel userCredentialsModel) {
        try {
            UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(userCredentialsModel.getUsername(),CharBuffer.wrap(userCredentialsModel.getPassword()));
            Authentication authentication = authenticationManager.authenticate(usernamePasswordAuthenticationToken);
            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwt = jwtUtils.generateJwtToken(authentication);
            MyUserDetails userDetails = (MyUserDetails) authentication.getPrincipal();
            List<String> roles = userDetails.getAuthorities().stream()
                    .map(item -> item.getAuthority())
                    .collect(Collectors.toList());

            return ResponseEntity.ok(new JwtResponse(jwt,
                    userDetails.getLoggedIn(),
                    userDetails.getUserId(),
                    userDetails.getProfile(),
                    userDetails.getUsername(),
                    roles));
        }catch (BadCredentialsException ex) {
            throw new LoginAuthenticationException("Invalid username and password!");
        }
    }
    public ResponseEntity<?> createAddressDetailsForUser(UserAddressModel userAddressModel) {

        UserCredentials userCredentials = userCredentialsRepository.findUserById((userAddressModel.getUserId()));
        UserAddressDetails userAddressDetails = userCredentials.getUserAddressDetails();

        if(userAddressDetails == null){
            userAddressDetails = modelMapper.map(userAddressModel, UserAddressDetails.class);
            userAddressDetails.setState(userAddressModel.getRegion());
            UserAddressDetails newUserAddressDetails = userAddressDetailsRepository.save(userAddressDetails);
            userCredentials.setUserAddressDetails(newUserAddressDetails);
            userCredentialsRepository.save(userCredentials);
        }else{
            userAddressDetails = modelMapper.map(userAddressModel, UserAddressDetails.class);
            userAddressDetails.setState(userAddressModel.getRegion());
            userAddressDetailsRepository.save(userAddressDetails);
        }

        return ResponseEntity.ok().body("Profile details has been Created Successfully");
    }

    public ResponseEntity<?> getAddressDetailsForUser(Long userId) {
        UserCredentials userCredentials = userCredentialsRepository.findUserById(userId);
        Long addressId = userCredentials.getUserAddressDetails().getId();
        UserAddressDetails userAddressDetails = userAddressDetailsRepository.getAddressById(addressId);
        UserAddressModel userAddressModel = modelMapper.map(userAddressDetails, UserAddressModel.class);
        userAddressModel.setRegion(userAddressDetails.getState());
        userAddressModel.setUserId(userId);
        return ResponseEntity.ok().body(userAddressModel);
    }
}
