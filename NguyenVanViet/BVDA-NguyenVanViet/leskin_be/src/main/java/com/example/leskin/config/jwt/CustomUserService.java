package com.example.leskin.config.jwt;

import com.example.leskin.repository.entity.User;
import com.example.leskin.repository.UserRepository;
import com.example.leskin.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CustomUserService implements UserDetailsService {
    @Autowired
    UserService userService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> userOptional = Optional.ofNullable(userService.getUserByUserName(username));
        if (!userOptional.isPresent()) {
            throw new UsernameNotFoundException(username);
        }
        return new CustomUserDetails(userOptional.get());
    }
}
