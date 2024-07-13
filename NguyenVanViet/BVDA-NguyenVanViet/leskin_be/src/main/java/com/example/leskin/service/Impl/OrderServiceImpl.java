package com.example.leskin.service.Impl;

import com.example.leskin.model.BaseResponse;
import com.example.leskin.repository.BaseRepository;
import com.example.leskin.repository.OrderRepository;
import com.example.leskin.repository.entity.Order;
import com.example.leskin.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderServiceImpl extends BaseServiceImpl<Order> implements OrderService {
    @Autowired
    OrderRepository orderRepository;
    @Override
    protected BaseRepository<Order> getRepository() {
        return orderRepository;
    }

    @Override
    public BaseResponse customCreate(Order order) {
        List<Order> orderList = orderRepository.checkOrder(order.getDate(), order.getExpert().getId());
        if (!orderList.isEmpty()){
            return new BaseResponse(500, "CHuyên gia này đã kín lịch", null );
        }
        order.setStatus(1);
        return new BaseResponse().success(orderRepository.save(order));
    }
}
