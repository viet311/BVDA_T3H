package com.example.leskin.service.Impl;

import com.example.leskin.config.jwt.JwtTokenProvider;
import com.example.leskin.constants.Status;
import com.example.leskin.model.BaseResponse;
import com.example.leskin.model.LoginResponse;
import com.example.leskin.model.req.LoginRequest;
import com.example.leskin.repository.BaseRepository;
import com.example.leskin.repository.UserRepository;
import com.example.leskin.repository.entity.User;
import com.example.leskin.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.security.NoSuchAlgorithmException;
import java.util.Objects;
import java.util.Optional;

@Service
public class UserServiceImpl extends BaseServiceImpl<User> implements UserService {
    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    @Autowired
    private JwtTokenProvider jwtTokenProvider;


    @Autowired
    UserRepository userRepository;
    @Override
    protected BaseRepository<User> getRepository() {
        return userRepository;
    }

    @Override
    public User getUserByUserName(String username) {
        return userRepository.findAllByUserName(username).get();
    }

    @Override
    public BaseResponse login(LoginRequest loginRequest) throws NoSuchAlgorithmException {
        Optional<User> userOptional = userRepository.findAllByUserName(loginRequest.getUserName());
        if (!userOptional.isPresent())
            return new BaseResponse(500, "Account không tồn tại", null);

        User user = userOptional.get();
        if (!Objects.equals(user.getStatus(), Status.ACTIVE))
            return new BaseResponse(500, "Account đã bị khóa", null);

        if (!isValidPassword(user.getPassword(), loginRequest.getPassword())) {
            return new BaseResponse(500, "Mật khẩu không chính xác", null);
        }

        LoginResponse loginResponse = new LoginResponse();
        loginResponse.setToken(jwtTokenProvider.generateToken(user.getUserName()));
        loginResponse.setUserId(user.getId());
        loginResponse.setRole(user.getRole());
        return new BaseResponse(200, "OK", loginResponse);
    }

    @Override
    public BaseResponse customCreate(User user) throws Exception {
        if (user.getUserName() == null){
            return new BaseResponse().fail("Tài khoản không được để trống");
        }
        if (user.getPassword() == null){
            return new BaseResponse().fail("Mật khẩu không được để trống");
        }

        if (userRepository.findAllByUserName(user.getUserName()).isPresent()){
            return new BaseResponse().fail("Tài khoản đã tồn tại");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return new BaseResponse().success(super.create(user));
    }


    @Override
    public User create(User user) throws Exception {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return super.create(user);
    }

    private boolean isValidPassword(String userPass, String reqPass) {
        return !StringUtils.isEmpty(reqPass) && passwordEncoder.matches(reqPass, userPass);
    }
}
