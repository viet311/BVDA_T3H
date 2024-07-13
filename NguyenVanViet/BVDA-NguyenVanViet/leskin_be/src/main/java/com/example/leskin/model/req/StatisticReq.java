package com.example.leskin.model.req;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StatisticReq {
    int type;
    String startDate;
    String endDate;
}
