package com.datascope.datascopebackend.service;

import com.datascope.datascopebackend.entity.Offer;
import com.datascope.datascopebackend.entity.User;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;

public interface IUserService {
    ResponseEntity<String> signUp(Map<String,String> RequestMap);

    ResponseEntity<String> login(Map<String,String> RequestMap);

    ResponseEntity<String> checkToken();

    public User retrieveUser(String email);

    public List<User> retrieveAllUsers();

    public void removeUser(Long userId);
    public User modifyUser(User user);
}
