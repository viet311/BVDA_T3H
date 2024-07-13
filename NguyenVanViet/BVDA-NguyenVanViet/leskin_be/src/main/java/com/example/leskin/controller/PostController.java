package com.example.leskin.controller;

import com.example.leskin.repository.entity.Post;
import com.example.leskin.service.BaseService;
import com.example.leskin.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
@RequestMapping("/post")
public class PostController extends BaseController<Post>{
    @Autowired
    private PostService postService;
    @Override
    protected BaseService<Post> getService() {
        return postService;
    }
}
