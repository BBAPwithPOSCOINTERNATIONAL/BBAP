package com.bbap.approval.service;

import java.time.LocalDateTime;
import java.time.temporal.TemporalAdjusters;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bbap.approval.dto.ApprovalInfoDto;
import com.bbap.approval.dto.EmployeeDto;
import com.bbap.approval.dto.SearchInfoDto;
import com.bbap.approval.dto.TotalPaymentDto;
import com.bbap.approval.dto.request.ApprovalTargetEmployeesDto;
import com.bbap.approval.dto.request.DetailSearchRequestDto;
import com.bbap.approval.dto.request.ListApprovalRequestDto;
import com.bbap.approval.dto.response.DataResponseDto;
import com.bbap.approval.dto.response.DetailSearchResponseData;
import com.bbap.approval.dto.response.ListApprovalResponseData;
import com.bbap.approval.dto.response.ListEmployeeResponseData;
import com.bbap.approval.dto.response.ListSearchResponseData;
import com.bbap.approval.dto.response.ResponseDto;
import com.bbap.approval.exception.ApproveNotFoundException;
import com.bbap.approval.feign.HrServiceFeignClient;
import com.bbap.approval.repository.ApprovalRepository;
import com.bbap.approval.repository.PaymentHistoryRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Transactional
@Service
@RequiredArgsConstructor
@Slf4j
public class ApprovalServiceImpl implements ApprovalService {
	private final HrServiceFeignClient hrServiceFeignClient;

	private final ApprovalRepository approvalRepository;
	private final PaymentHistoryRepository paymentHistoryRepository;

	@Override
	public ResponseEntity<DataResponseDto<ListApprovalResponseData>> listApproval(ListApprovalRequestDto request) {
		//검색 조건에 해당하는 사원들의 정보를 가져옴
		ListEmployeeResponseData listEmpData = hrServiceFeignClient.searchEmployees(request).getBody().getData();

		//해당하는 사원들의 empId를 이용해 바로 결재가 되지 않은 사원들의
		//이전 월 총 결제 금액, 총 사용 지원금 , 총 자기 부담금을 가져옴
		List<Integer> empIds = listEmpData.getEmployeeList().stream()
			.map(EmployeeDto::getEmpId)
			.toList();

		// 전월의 첫 날과 마지막 계산
		LocalDateTime now = LocalDateTime.now();
		LocalDateTime start = now.minusMonths(1)
			.with(TemporalAdjusters.firstDayOfMonth())
			.withHour(0)
			.withMinute(0)
			.withSecond(0)
			.withNano(0);
		LocalDateTime end = now.minusMonths(1)
			.with(TemporalAdjusters.lastDayOfMonth())
			.withHour(23)
			.withMinute(59)
			.withSecond(59)
			.withNano(999999999);

		List<TotalPaymentDto> totalPaymentList = approvalRepository.findTotalPayment(empIds, start, end);

		// TotalPaymentDto 리스트를 Map으로 변환 (empId를 키로 사용)
		Map<Integer, TotalPaymentDto> paymentMap = totalPaymentList.stream()
			.collect(Collectors.toMap(
				TotalPaymentDto::getEmpId, // TotalPaymentDto에서 empId를 추출하여 키로 사용
				p -> p
			));

		// EmployeeDto 리스트를 ListApprovalResponseDto 리스트로 변환
		List<ApprovalInfoDto> employeeList = listEmpData.getEmployeeList().stream()
			.map(emp -> {
				TotalPaymentDto payment = paymentMap.get(emp.getEmpId());
				if (payment == null)
					return null;

				return ApprovalInfoDto.builder()
					.empId(emp.getEmpId())
					.empNo(emp.getEmpNo())
					.empName(emp.getEmpName())
					.departmentName(emp.getDepartment().getDepartmentName())
					.positionName(emp.getPosition().getPositionName())
					.workplaceName(emp.getWorkplace().getWorkplaceName())
					.totalPayment(payment.getTotalPaymentAmountSum())
					.totalSubsidy(payment.getUseSubsidySum())
					.totalSelfPayment(payment.getSelfPaymentSum())
					.build();
			})
			.filter(Objects::nonNull)
			.toList();

		return DataResponseDto.of(new ListApprovalResponseData(employeeList));
	}

	@Override
	public ResponseEntity<DataResponseDto<ListSearchResponseData>> listSearch(ListApprovalRequestDto request) {
		//검색 조건에 해당하는 사원들의 정보를 가져옴
		ListEmployeeResponseData listEmpData = hrServiceFeignClient.searchEmployees(request).getBody().getData();

		// EmployeeDto 리스트를 ListApprovalResponseDto 리스트로 변환
		List<SearchInfoDto> employeeList = listEmpData.getEmployeeList().stream()
			.map(emp -> {
				return SearchInfoDto.builder()
					.empId(emp.getEmpId())
					.empNo(emp.getEmpNo())
					.empName(emp.getEmpName())
					.departmentName(emp.getDepartment().getDepartmentName())
					.positionName(emp.getPosition().getPositionName())
					.workplaceName(emp.getWorkplace().getWorkplaceName())
					.build();
			})
			.filter(Objects::nonNull)
			.toList();
		return DataResponseDto.of(new ListSearchResponseData(employeeList));
	}

	@Override
	public ResponseEntity<DataResponseDto<DetailSearchResponseData>> detailSearch(int empId,
		DetailSearchRequestDto request) {
		//인덱스 기반으로 검색하기 위해 LocalDateTime으로 변경
		LocalDateTime start = request.getStartDate().atStartOfDay();
		LocalDateTime end = request.getEndDate().atTime(23, 59, 59, 999999999);

		return DataResponseDto.of(new DetailSearchResponseData(paymentHistoryRepository.findByDate(empId, start, end)));
	}

	@Override
	public ResponseEntity<ResponseDto> approve(ApprovalTargetEmployeesDto request) {
		int result = approvalRepository.empsApprove(request.getEmployeeIds());

		if (result != request.getEmployeeIds().size())
			throw new ApproveNotFoundException();

		return null;
	}
}
