package com.example.leskin.controller;

import com.example.leskin.model.BaseResponse;
import com.example.leskin.model.req.StatisticReq;
import com.example.leskin.service.StatisticService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/statistic")
public class StatisticController {
    @Autowired
    private StatisticService statisticService;
    @PostMapping("")
    public BaseResponse create(@RequestBody StatisticReq req) throws Exception {
        return statisticService.statistic(req);
    }
}
