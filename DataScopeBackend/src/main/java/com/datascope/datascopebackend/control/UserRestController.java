package com.datascope.datascopebackend.control;

import com.datascope.datascopebackend.entity.Offer;
import com.datascope.datascopebackend.entity.User;
import com.datascope.datascopebackend.service.UserServiceImpl;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@AllArgsConstructor
@RequestMapping("/user")
public class UserRestController {

    @Autowired
    UserServiceImpl userService;

    @PostMapping("/signup")
    public ResponseEntity<String> signUp(@RequestBody(required = true)Map<String,String> RequestMap) {
        try {
            return userService.signUp(RequestMap);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<String>("Something went wrong.", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody(required = true)Map<String,String> requestMap) {
        try {
            return userService.login(requestMap);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<String>("Something went wrong.", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @GetMapping("/check-token")
    public ResponseEntity<String> checkToken() {
        try {
            return userService.checkToken();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<String>("Something went wrong.", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    // http://localhost:8089/datascope/user/retrieve-user/
    @GetMapping("/retrieve-user/{email}")
    public User retrieveUser(@PathVariable("email") String email) {
        User user = userService.retrieveUser(email);
        System.out.println("The extracted user is: " + user.getEmail());
        return user;
    }

    // http://localhost:8089/datascope/user/retrieve-all-users
    @GetMapping("/retrieve-all-users")
    public List<User> getUsers() {
        List<User> listUsers = userService.retrieveAllUsers();
        return listUsers;
    }

    // http://localhost:8089/datascope/user/delete-user/{user-id}
    @GetMapping("/delete-user/{user-id}")
    public ResponseEntity<Void> deleteUserUsingGet(@PathVariable("user-id") Long userId) {
        userService.removeUser(userId);
        return ResponseEntity.ok().build();
    }

    // http://localhost:8089/datascope/user/modify-user
    @PutMapping("/modify-user")
    public User modifyUser(@RequestBody User c) {
        User user = userService.modifyUser(c);
        return user;
    }
}
