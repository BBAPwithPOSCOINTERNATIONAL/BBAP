import apiClient from "./apiClient";
import { isAxiosError } from "axios";

interface ApiResponse {
  message: string;
  accessToken?: string;
  refreshToken?: string;
}

interface LoginResponse {
  message: string;
  data: {
    accessToken?: string;
    refreshToken?: string;
  };
}

/**
 * 로그인
 * @remarks
 * POST 요청을 '/api/v1/hr/auth/login' 엔드포인트에 보냅니다. 성공시 메시지와 헤더를 반환합니다.
 * @param {string} empNo 로그인할 사용자 ID
 * @param {string} userPassword 사용자 비밀번호
 * @param {string} fcmToken 사용자 비밀번호
 * @returns {Promise<LoginResponse>} "Success." 메시지와 함께 accessToken, refreshToken을 반환합니다.
 * @throws 400 "Bad request." 또는 404 "Not found." 오류를 반환할 수 있습니다.
 */
export const login = async (
  empNo: string,
  password: string,
  fcmToken: string
): Promise<LoginResponse> => {
  try {
    const response = await apiClient.post<LoginResponse>("/hr/auth/login", {
      empNo,
      password,
      fcmToken,
    });
    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw error;
  }
};

/**
 * 로그아웃
 * @remarks
 * POST 요청을 '/api/v1/hr/auth/logout' 엔드포인트에 보냅니다. 성공시 메시지를 반환합니다.
 * @returns {Promise<ApiResponse>} "Success." 메시지를 반환합니다.
 * @throws 401 "Certification failed." 또는 403 "RefreshToken error." 오류를 반환할 수 있습니다.
 */
export const logout = async (): Promise<ApiResponse> => {
  try {
    const response = await apiClient.post<ApiResponse>("/hr/auth/logout");
    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw error;
  }
};

/**
 * 유저정보 받아오기
 * @remarks
 * GET 요청을 '/apiv1/hr/auth/user-info' 엔드포인트에 보냅니다. 성공 시 message와 유저 정보를 반환합니다.
 * @returns {Promise<UserInfo>} message와 유저 정보를 반환합니다.
 * @throws  오류를 반환할 수 있습니다.
 */

export type Department = {
  departmentId: number;
  departmentName: string;
};

export type Position = {
  positionId: number;
  positionName: string;
};

export type Workplace = {
  workplaceId: number;
  workplaceName: string;
};

export type EmpInfo = {
  message: string;
  data: {
    empId: number;
    empNo: string;
    empName: string;
    department: Department;
    position: Position;
    workplace: Workplace;
  };
};

export const getUserInfo = async (): Promise<EmpInfo> => {
  try {
    const response = await apiClient.get<EmpInfo>("/hr/auth/user-info");
    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data);
    }
    throw error;
  }
};

/**
 * 사원목록 조회 ( 담당자가 )
 * @remarks
 * GET 요청을 '/api/v1/hr/employee/' 엔드포인트에 보냅니다. 성공 시 message와 유저 정보를 반환합니다.
 * @returns {Promise<UserInfo>} message와 유저 정보를 반환합니다.
 * @throws 오류를 반환할 수 있습니다.
 */

export interface Employee {
  empId: number;
  empNo: string;
  empName: string;
  departmentName: string;
  positionName: string;
  workplaceName: string;
}
interface EmployeeListResponse {
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
}): Promise<EmployeeListResponse> => {
  try {
    const response = await apiClient.get<EmployeeListResponse>(
      "approvals/search",
      {
        params: filters,
      }
    );
    console.log("Employee List:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching employees:", error);
    throw error;
  }
};

/**
 * 특정 사원 조회
 * @remarks
 * GET 요청을 '/api/v1/approvals/search/{empId}' 엔드포인트에 보냅니다. 성공 시 message와 유저 정보를 반환합니다.
 * @returns {Promise<UserInfo>} message와 유저 정보를 반환합니다.
 * @throws 오류를 반환할 수 있습니다.
 */

export interface PaymentDetail {
  totalPaymentAmount: number;
  useSubsidy: number;
  selfPayment: number;
  paymentDate: string;
}

interface PaymentListResponse {
  message: string;
  data: {
    paymentList: PaymentDetail[];
  };
}

export const fetchPaymentDetails = async (
  empId: number,
  filters: {
    startDate: Date;
    endDate: Date;
  }
): Promise<PaymentListResponse> => {
  try {
    const formattedStartDate = filters.startDate.toISOString().slice(0, 10);
    const formattedEndDate = filters.endDate.toISOString().slice(0, 10);

    const response = await apiClient.get<PaymentListResponse>(
      `approvals/search/${empId}`,
      {
        params: {
          startDate: formattedStartDate,
          endDate: formattedEndDate,
        },
      }
    );
    console.log("Employee List:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching employees:", error);
    throw error;
  }
};

/**
 * 근무지별 지원금 조회
 * @remarks
 * GET 요청을 '/api/v1/hr/subsidy/{workplaceId}' 엔드포인트에 보냅니다. 성공 시 message와 유저 정보를 반환합니다.
 * @returns {Promise<SubsidyListResponse>} message와 지원금 정보를 반환합니다.
 * @throws 오류를 반환할 수 있습니다.
 */

export interface Subsidy {
  mealClassification: number;
  startTime: string;
  endTime: string;
  subsidy: number;
}

interface SubsidyListResponse {
  message: string;
  data: {
    subsidyList: Subsidy[];
  };
}

export const fetchSubsidyDetails = async (
  workplaceId: number
): Promise<SubsidyListResponse> => {
  try {
    const response = await apiClient.get<SubsidyListResponse>(
      `hr/subsidy/${workplaceId}`
    );
    console.log("Subsidy Details:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

/**
 * "카테고리 목록 조회"
 * @remarks
 * GET 요청을 '/api/v1/category' 엔드포인트에 보냅니다. 성공시 메시지를 반환합니다.
 * @returns {Promise<CategoryResponse>} "Success." 메시지를 반환합니다.
 */

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
