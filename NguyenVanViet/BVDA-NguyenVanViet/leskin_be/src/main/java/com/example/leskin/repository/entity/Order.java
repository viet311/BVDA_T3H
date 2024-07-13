package com.example.leskin.repository.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@Entity
@Table(name = "orderr")
public class Order extends BaseEntity{
    @ManyToOne
    @JoinColumn(name = "create_by")
    private User createBy;

    @ManyToOne
    @JoinColumn(name = "service")
    private Service service;

    @ManyToOne
    @JoinColumn(name = "expert")
    private Expert expert;

    @Column(name = "date")
    private Long date;

    @Column(name = "price")
    private Long price;
}
