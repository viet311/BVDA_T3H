package com.example.leskin.controller;

import com.example.leskin.model.BaseResponse;
import com.example.leskin.repository.entity.Order;
import com.example.leskin.service.BaseService;
import com.example.leskin.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/order")
public class OrderController extends BaseController<Order>{
    @Autowired
    OrderService orderService;
    @Override
    protected BaseService<Order> getService() {
        return orderService;
    }

    @Override
    @PostMapping("/create")
    public BaseResponse create(@RequestBody Order order) throws Exception {
        return orderService.customCreate(order);
    }

}
