package com.datascope.datascopebackend.service;

import com.datascope.datascopebackend.entity.Offer;
import com.datascope.datascopebackend.entity.Role;
import com.datascope.datascopebackend.entity.User;
import com.datascope.datascopebackend.repository.UserRepository;
import jdk.jfr.Frequency;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@Slf4j
@Service
@AllArgsConstructor
public class UserServiceImpl implements IUserService{
    UserRepository userRepository;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    CustomerUserDetailsService customerUserDetailsService;

    @Autowired
    JWTService jwtService;

    @Override
    public ResponseEntity<String> signUp(Map<String, String> requestMap) {
        log.info("Inside signup {}", requestMap);
        try {
            if (validateSignUpMap(requestMap)) {
                User user = userRepository.findByEmail(requestMap.get("email"));
                if (Objects.isNull(user)) {
                    userRepository.save(getUserFromMap(requestMap));
                    return new ResponseEntity<String>("User registered successfully!", HttpStatus.OK);
                } else {
                    return new ResponseEntity<String>("Email already exists.", HttpStatus.BAD_REQUEST);
                }
            } else {
                return new ResponseEntity<String>("Something went wrong.", HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<String>("Something went wrong.", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    private boolean validateSignUpMap(Map<String, String> requestMap){
        if(requestMap.containsKey("email") && requestMap.containsKey("password")
                && requestMap.containsKey("firstName") && requestMap.containsKey("lastName")
                && requestMap.containsKey("address") && requestMap.containsKey("phoneNumber"))
        {
            return true;
        }
        return false;
    }

    private User getUserFromMap(Map<String, String> requestMap) throws ParseException {
        User user = new User();
        user.setEmail(requestMap.get("email"));
        user.setPassword(requestMap.get("password"));
        user.setFirstName(requestMap.get("firstName"));
        user.setLastName(requestMap.get("lastName"));
        user.setAddress(requestMap.get("address"));
        // Parse the birthDate String to a Date object
        String birthDateString = requestMap.get("birthDate");
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd"); // Adjust format as needed
        Date birthDate = dateFormat.parse(birthDateString);
        user.setBirthDate(birthDate);
        user.setPhoneNumber(Integer.valueOf(requestMap.get("phoneNumber")));
        user.setRole(Role.USER);
        return user;
    }

    @Override
    public ResponseEntity<String> login(Map<String, String> RequestMap) {
        log.info("Inside login");
        try {
            Authentication auth = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(RequestMap.get("email"), RequestMap.get("password"))
            );
            if (auth.isAuthenticated()) {
                return new ResponseEntity<String>("{\"token\":\""+
                        jwtService.generateToken(customerUserDetailsService.getUserDetail().getEmail(),
                                String.valueOf(customerUserDetailsService.getUserDetail().getRole())) + "\"}",
                        HttpStatus.OK);
            }
        } catch (Exception ex) {
            log.error("{}",ex);
        }
        return new ResponseEntity<String>("Failed to login.", HttpStatus.BAD_REQUEST);
    }

    @Override
    public ResponseEntity<String> checkToken() {
        return new ResponseEntity<String>("{\"mesage\":\""+ "true" + "\"}", HttpStatus.OK);
    }

    @Override
    public User retrieveUser(String email) {
        return userRepository.findByEmail(email);
    }

    public List<User> retrieveAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public void removeUser(Long userId) {
        userRepository.deleteById(userId);
    }

    @Override
    public User modifyUser(User user) {
        return userRepository.save(user);
    }
}
