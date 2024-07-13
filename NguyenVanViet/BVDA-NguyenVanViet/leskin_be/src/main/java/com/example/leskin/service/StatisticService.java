package com.example.leskin.service;

import com.example.leskin.model.BaseResponse;
import com.example.leskin.model.req.StatisticReq;

public interface StatisticService {
    BaseResponse statistic(StatisticReq req);
}
