package com.bbap.hr.service;

import com.bbap.hr.dto.response.DataResponseDto;
import com.bbap.hr.dto.response.ListSubsidyData;
import org.springframework.http.ResponseEntity;

public interface HrService {
    ResponseEntity<DataResponseDto<ListSubsidyData>> getSubsidyByWorkplace(Integer workplaceId);
}
