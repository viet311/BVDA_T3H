package com.example.leskin.controller;

import com.example.leskin.model.BaseResponse;
import com.example.leskin.model.req.LoginRequest;
import com.example.leskin.repository.entity.User;
import com.example.leskin.service.BaseService;
import com.example.leskin.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.security.NoSuchAlgorithmException;

@CrossOrigin
@RestController
@RequestMapping("/user")
public class UserController extends BaseController<User> {
    @Autowired
    private UserService userService;

    @Override
    protected BaseService<User> getService() {
        return userService;
    }

    @PostMapping("/login")
    public BaseResponse login(@RequestBody LoginRequest loginRequest) throws NoSuchAlgorithmException {
        return userService.login(loginRequest);
    }

    @Override
    @PostMapping("/create")
    public BaseResponse create(@RequestBody User user) throws Exception {
        return userService.customCreate(user);
    }
}