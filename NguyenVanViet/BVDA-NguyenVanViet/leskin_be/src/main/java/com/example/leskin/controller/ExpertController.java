package com.example.leskin.controller;

import com.example.leskin.repository.entity.Expert;
import com.example.leskin.service.BaseService;
import com.example.leskin.service.ExpertService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
@RequestMapping("/expert")
public class ExpertController extends BaseController<Expert>{
    @Autowired
    ExpertService expertService;
    @Override
    protected BaseService<Expert> getService() {
        return expertService;
    }
}
