import apiClient from "./apiClient";

/**
 * 결제 목록 조회(월별)
 * @remarks
 * GET 요청을 '/api/v1/payments/month/{yearMonth}' 엔드포인트에 보냅니다.
 * @returns {Promise<PaymentResponse>} "Success" 메시지와 data 를 반환합니다.
 * @throws  오류를 반환할 수 있습니다.
 */

interface DayPayment {
  day: number;
  totalPaymentAmount: number;
  useSubsidy: number;
  selfPayment: number;
}

interface PaymentData {
  totalPaymentAmountSum: number;
  useSubsidySum: number;
  selfPaymentSum: number;
  dayPaymentList: DayPayment[];
}

interface PaymentResponse {
  message: string;
  data: PaymentData;
}

export const getMonthlyPayments = async (
  yearMonth: string
): Promise<PaymentResponse> => {
  try {
    const response = await apiClient.get<PaymentResponse>(
      `/api/v1/payments/month/${yearMonth}`
    );
    console.log("Monthly Payments:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

/**
 * 결제 목록 조회(일별)
 * @remarks
 * GET 요청을 '/api/v1/payments/day/{date}' 엔드포인트에 보냅니다.
 * @returns {Promise<CafeListResponse>} "Success" 메시지와 data 를 반환합니다.
 * @throws  오류를 반환할 수 있습니다.
 */

interface PaymentHistory {
  historyId: number;
  totalPaymentAmount: number;
  useSubsidy: number;
  selfPayment: number;
  paymentDetail: string;
}

// Define the structure for the response data
interface DailyPaymentResponse {
  message: string;
  data: {
    paymentList: PaymentHistory[];
  };
}

// Function to fetch payment history for a specific date
export const getDailyPayments = async (
  date: string
): Promise<DailyPaymentResponse> => {
  try {
    const response = await apiClient.get<DailyPaymentResponse>(
      `/api/v1/payments/day/${date}`
    );
    console.log("Daily Payments:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

/**
 * 결제 내역 상세
 * @remarks
 * GET 요청을 '/api/v1/payments/{historyId} 엔드포인트에 보냅니다.
 * @returns {Promise<PaymentDetailsResponse>} "Success" 메시지와 data 를 반환합니다.
 * @throws  오류를 반환할 수 있습니다.
 */

interface PaymentDetails {
  totalPaymentAmount: number;
  useSubsidy: number;
  selfPayment: number;
  paymentDetail: string;
  payStore: string;
  historyMemo: string;
  paymentDate: string; // LocalDateTime format assumed to be ISO string
}

// Define the structure for the API response
interface PaymentDetailsResponse {
  message: string;
  data: PaymentDetails;
}

// Function to fetch details of a specific payment by history ID
export const getPaymentDetails = async (
  historyId: number
): Promise<PaymentDetailsResponse> => {
  try {
    const response = await apiClient.get<PaymentDetailsResponse>(
      `/api/v1/payments/${historyId}`
    );
    console.log("Payment Details:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
