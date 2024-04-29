package com.bbap.order.dto;

import java.util.List;

import com.bbap.order.dto.request.MenuRequestDto;

public interface BaseOrderDto {
    List<MenuRequestDto> getMenuList();
}
