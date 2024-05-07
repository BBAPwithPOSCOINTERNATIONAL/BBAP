import apiClient from "./apiClient";

/**
 * 결재 처리
 * @remarks
 * PUT 요청을 '/api/v1/approvals' 엔드포인트에 보냅니다. 성공시 메시지와 헤더를 반환합니다.
 * @param { number[]} employeeIds 결재승인할 id 들
 * @returns {Promise<ApprovalResponse>} "Success." 메시지와 함께 accessToken, refreshToken을 반환합니다.
 * @throws 400 "Bad request." 오류를 반환할 수 있습니다.
 */

interface ApprovalRequest {
  employeeIds: number[];
}

// Define the structure for the API response
interface ApprovalResponse {
  message: string;
}

// Function to send approval for a list of employees
export const sendApproval = async (
  employeeIds: number[]
): Promise<ApprovalResponse> => {
  try {
    const requestData: ApprovalRequest = {
      employeeIds: employeeIds,
    };
    const response = await apiClient.put<ApprovalResponse>(
      "approvals",
      requestData
    );
    console.log("Approval:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

/**
 * 결재 정보 조회
 * @remarks
 * GET 요청을 '/api/v1/approvals' 엔드포인트에 보냅니다. 성공시 메시지와 헤더를 반환합니다.
 * @param { number[]} employeeIds 결재승인할 id 들
 * @returns {Promise<ApprovalEmpResponse>} "Success." 메시지와 함께 accessToken, refreshToken을 반환합니다.
 * @throws 400 "Bad request." 오류를 반환할 수 있습니다.
 */

export interface Employee {
  empId: number;
  empNo: string;
  empName: string;
  departmentName: string;
  positionName: string;
  workplaceName: string;
  totalPayment: number;
  totalSubsidy: number;
  totalSelfPayment: number;
}

interface ApprovalEmpResponse {
  message: string;
  data: {
    employeeList: Employee[];
  };
}

export const fetchEmployees = async (filters: {
  name?: string;
  workplaceId?: number;
  positionId?: number;
  departmentId?: number;
}): Promise<ApprovalEmpResponse> => {
  try {
    const response = await apiClient.get<ApprovalEmpResponse>("approvals", {
      params: filters,
    });
    console.log("List:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

// /**
//  * "결제 목록 조회(담당자가 특정 사원 조회)"
//  * @remarks
//  * GET 요청을 '/api/v1/approvals/search' 엔드포인트에 보냅니다. 성공시 메시지와 헤더를 반환합니다.
//  * @param { number[]} employeeIds 결재승인할 id 들
//  * @returns {Promise<ApprovalResponse>} "Success." 메시지와 함께 accessToken, refreshToken을 반환합니다.
//  * @throws 400 "Bad request." 오류를 반환할 수 있습니다.
//  */


/**
 * "카테고리 목록 조회"
 * @remarks
 * GET 요청을 '/api/v1/category' 엔드포인트에 보냅니다. 성공시 메시지를 반환합니다.
 * @returns {Promise<CategoryResponse>} "Success." 메시지를 반환합니다.
 */

export interface Workplace {
  workplaceId: number;
  workplaceName: string;
}

export interface Department {
  departmentId: number;
  departmentName: string;
}

export interface Position {
  positionId: number;
  positionName: string;
}

interface CategoryResponse {
  message: string;
  data: {
    workplaceList: Workplace[];
    departmentList: Department[];
    positionList: Position[];
  };
}

export const fetchCategoryData = async (): Promise<CategoryResponse> => {
  try {
    const response = await apiClient.get<CategoryResponse>("/hr/category");
    console.log("Category Data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching category data:", error);
    throw error;
  }
};
