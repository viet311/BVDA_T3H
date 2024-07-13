package com.example.leskin.service;

import com.example.leskin.model.req.SearchReq;
import com.example.leskin.repository.entity.BaseEntity;
import org.springframework.data.domain.Page;

import java.util.List;

public interface BaseService<T extends BaseEntity> {
    Page<T> search(SearchReq req);

    T create(T t) throws Exception;

    T update(T t) throws Exception;

    T getById(Long id) throws Exception;

    List<T> getAll();

    void delete(Long id);

    void createAll(List<T> entities);
}
