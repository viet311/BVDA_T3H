package com.example.leskin.controller;

import com.example.leskin.repository.entity.Service;
import com.example.leskin.service.BaseService;
import com.example.leskin.service.ServiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
@RequestMapping("/service")
public class ServiceController extends BaseController<Service>{
    @Autowired
    ServiceService serviceService;
    @Override
    protected BaseService<Service> getService() {
        return serviceService;
    }
}
