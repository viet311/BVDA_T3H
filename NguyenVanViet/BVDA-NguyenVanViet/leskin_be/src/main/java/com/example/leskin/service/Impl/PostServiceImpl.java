package com.example.leskin.service.Impl;

import com.example.leskin.repository.BaseRepository;
import com.example.leskin.repository.PostRepository;
import com.example.leskin.repository.entity.Post;
import com.example.leskin.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PostServiceImpl extends BaseServiceImpl<Post> implements PostService {
    @Autowired
    private PostRepository postRepository;

    @Override
    protected BaseRepository<Post> getRepository() {
        return postRepository;
    }
}
