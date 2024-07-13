package com.example.leskin.service.Impl;

import com.example.leskin.repository.BaseRepository;
import com.example.leskin.repository.ExpertRepository;
import com.example.leskin.repository.entity.Expert;
import com.example.leskin.service.ExpertService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ExpertServiceImpl extends BaseServiceImpl<Expert> implements ExpertService {
    @Autowired
    ExpertRepository expertRepository;
    @Override
    protected BaseRepository<Expert> getRepository() {
        return expertRepository;
    }
}
