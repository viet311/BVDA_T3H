package com.example.leskin.service.Impl;

import com.example.leskin.repository.BaseRepository;
import com.example.leskin.repository.ServiceRepository;
import com.example.leskin.repository.entity.Service;
import com.example.leskin.service.ServiceService;
import org.springframework.beans.factory.annotation.Autowired;

@org.springframework.stereotype.Service
public class ServiceServiceImpl extends BaseServiceImpl<Service> implements ServiceService {
    @Autowired
    private ServiceRepository serviceRepository;
    @Override
    protected BaseRepository<Service> getRepository() {
        return serviceRepository;
    }
}
