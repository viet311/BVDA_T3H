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
@Table(name = "post")
public class Post extends BaseEntity{
    @Column(name = "title")
    private String title;

    @Column(name = "content")
    private String content;

    @Column(name = "avatar", length = 99999999)
    private String avatar;
}
