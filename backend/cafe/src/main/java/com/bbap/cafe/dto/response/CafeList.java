package com.bbap.cafe.dto.response;

import java.util.List;

import com.bbap.cafe.entity.Cafe;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CafeList {
	List<Cafe> cafeList;
}
