package com.example.leskin.service;

import com.example.leskin.model.BaseResponse;
import com.example.leskin.repository.entity.Order;

public interface OrderService extends BaseService<Order>{
    public BaseResponse customCreate(Order order);
}
