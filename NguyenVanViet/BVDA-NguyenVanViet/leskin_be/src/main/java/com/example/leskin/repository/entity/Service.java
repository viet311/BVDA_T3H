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
@Table(name = "service")
public class Service extends BaseEntity{
    @Column(name = "name")
    private String name;

    @Column(name = "des")
    private String des;

    @Column(name = "avatar", length = 99999999)
    private String avatar;

    @Column(name = "price")
    private Long price;
}
