package com.datascope.datascopebackend.service;

import com.datascope.datascopebackend.entity.User;
import org.springframework.http.ResponseEntity;

import java.util.Map;

public interface IUserService {
    ResponseEntity<String> signUp(Map<String,String> RequestMap);

    ResponseEntity<String> login(Map<String,String> RequestMap);

    ResponseEntity<String> checkToken();

    public User retrieveUser(String email);
}
