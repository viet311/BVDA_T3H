package com.example.leskin.repository;

import com.example.leskin.repository.entity.Order;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends BaseRepository<Order> {
    @Query(value = "SELECT * FROM orderr o WHERE o.date = :time and o.expert = :id and status = 1", nativeQuery = true)
    List<Order> checkOrder(Long time, Long id);
}
