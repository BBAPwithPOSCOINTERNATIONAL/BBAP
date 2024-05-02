import apiClient from "./apiClient";

/**
 * 결재 생성
 * @remarks
 * PUT 요청을 '/api/v1/approval' 엔드포인트에 보냅니다. 성공시 메시지와 헤더를 반환합니다.
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
      "/api/v1/approval",
      requestData
    );
    console.log("Approval:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
