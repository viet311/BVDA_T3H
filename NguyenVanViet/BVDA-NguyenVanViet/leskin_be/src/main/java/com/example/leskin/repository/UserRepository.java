package com.example.leskin.repository;

import com.example.leskin.repository.entity.BaseEntity;
import com.example.leskin.repository.entity.User;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends BaseRepository<User> {
    Optional<User> findAllByUserName(String userName);
}
