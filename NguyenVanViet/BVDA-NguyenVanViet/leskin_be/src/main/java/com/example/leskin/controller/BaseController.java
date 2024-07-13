package com.example.leskin.controller;

import com.example.leskin.model.req.SearchReq;
import com.example.leskin.repository.entity.BaseEntity;
import com.example.leskin.model.BaseResponse;
import com.example.leskin.service.BaseService;
import org.springframework.web.bind.annotation.*;

@RestController
public abstract class BaseController<T extends BaseEntity> {
    protected abstract BaseService<T> getService();

    @PostMapping("/create")
    public BaseResponse create(@RequestBody T t) throws Exception {
        return new BaseResponse(200, "Tạo thành công!", this.getService().create(t));
    }

    @GetMapping("/search")
    public BaseResponse search(SearchReq req) {
        return new BaseResponse(200, "Lấy dữ liệu thành công!", this.getService().search(req));
    }

    @GetMapping("/detail")
    public BaseResponse getById(@RequestParam(value = "id") Long id) throws Exception {
        return new BaseResponse(200, "Lấy dữ liệu thành công!", this.getService().getById(id));
    }

    @PutMapping("/update")
    public BaseResponse update(@RequestBody T t) throws Exception {
        return new BaseResponse(200, "Cập nhật thành công!", this.getService().update(t));
    }


    @DeleteMapping("/delete")
    public BaseResponse deleteById(@RequestParam(name = "id") Long id) {
        this.getService().delete(id);
        return new BaseResponse(200, "Xóa thành công!");
    }

    @GetMapping("/get-all")
    public BaseResponse getAll() throws Exception {
        return new BaseResponse(200, "Lấy dữ liệu thành công!", this.getService().getAll());
    }
}
