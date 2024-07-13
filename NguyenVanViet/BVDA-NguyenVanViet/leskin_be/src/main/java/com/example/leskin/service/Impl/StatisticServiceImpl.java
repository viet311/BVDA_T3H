package com.example.leskin.service.Impl;

import com.example.leskin.model.BaseResponse;
import com.example.leskin.model.StatisticReponse;
import com.example.leskin.model.req.StatisticReq;
import com.example.leskin.repository.entity.Order;
import com.example.leskin.service.OrderService;
import com.example.leskin.service.StatisticService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Service
public class StatisticServiceImpl implements StatisticService {
    @Autowired
    OrderService orderService;

    @Override
    public BaseResponse statistic(StatisticReq req) {
        List<Order> orderList = orderService.getAll();
        if (orderList.isEmpty()){
            return new BaseResponse().success();
        }
        if (req.getType() == 1){
            List<StatisticReponse> results = new ArrayList<>();
            for (int i = 1; i <= 12; i++){
                StatisticReponse statisticReponse = new StatisticReponse();
                if (i < 10){
                    statisticReponse.setDate("Tháng 0" + i);
                }else {
                    statisticReponse.setDate("Tháng " + i);
                }
                statisticReponse.setQuantity(0);
                statisticReponse.setRevenue(0L);
                results.add(statisticReponse);
            }

            orderList.stream().forEach(e -> {
                results.stream().forEach(result -> {
                    String month = "Tháng " + e.getDate().toString().substring(4,6);
                    if (month.equals(result.getDate())){
                        result.setRevenue(e.getPrice() + result.getRevenue());
                        result.setQuantity(result.getQuantity() + 1);
                    }
                });
            });
            return new BaseResponse().success(results);
        }
        if (req.getType() == 2){
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");
            LocalDate startDate = LocalDate.parse(req.getStartDate(), formatter);
            LocalDate endDate = LocalDate.parse(req.getEndDate(), formatter);
            long numOfDaysBetween = ChronoUnit.DAYS.between(startDate, endDate);
            List<LocalDate> dates = IntStream.iterate(0, i -> i + 1)
                    .limit(numOfDaysBetween)
                    .mapToObj(i -> startDate.plusDays(i))
                    .collect(Collectors.toList());
            List<StatisticReponse> results = new ArrayList<>();
            dates.stream().forEach(e -> {
                StatisticReponse statisticReponse = new StatisticReponse();
                statisticReponse.setDate(e.toString());
                statisticReponse.setQuantity(0);
                statisticReponse.setRevenue(0L);
                results.add(statisticReponse);
            });

            orderList.stream().forEach(e -> {
                results.stream().forEach(result -> {
                    String check = LocalDate.parse(e.getDate().toString(), formatter).toString();
                    if (check.equals(result.getDate())){
                        result.setRevenue(e.getPrice() + result.getRevenue());
                        result.setQuantity(result.getQuantity() + 1);
                    }
                });
            });
            return new BaseResponse().success(results);
        }
        return null;
    }
}
