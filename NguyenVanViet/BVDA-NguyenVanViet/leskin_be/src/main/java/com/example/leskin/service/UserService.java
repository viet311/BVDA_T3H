package com.example.leskin.service;

import com.example.leskin.model.BaseResponse;
import com.example.leskin.model.req.LoginRequest;
import com.example.leskin.repository.entity.User;

import java.security.NoSuchAlgorithmException;

public interface UserService extends BaseService<User> {
    User getUserByUserName(String username);
    BaseResponse login(LoginRequest loginRequest) throws NoSuchAlgorithmException;
    BaseResponse customCreate(User user) throws Exception;

}
