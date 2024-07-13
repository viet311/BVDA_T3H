package com.example.leskin.repository.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@Entity
@Table(name = "user")
public class User extends BaseEntity{
    @Column(name = "user_name", unique = true)
    String userName;

    @Column(name = "password")
    String password;

    @Column(name = "email")
    String email;

    @Column(name = "role")
    String role;

    @Column(name = "phone")
    String phone;

    @Column(name = "full_name")
    String fullName;

    @Column(name = "avatar", length = 99999999)
    String avatar;
}
