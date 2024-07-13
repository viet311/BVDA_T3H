package com.example.leskin.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StatisticReponse {
    String date;
    int quantity;
    Long revenue;
}
