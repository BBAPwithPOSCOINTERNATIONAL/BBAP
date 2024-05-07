import apiClient from "./apiClient";
import axios from "axios";

/**
 * 얼굴 등록 여부
 * @remarks
 * GET 요청을 '/api/v1/faces' 엔드포인트에 보냅니다. 성공시 메시지를 반환합니다.
 * @returns  "Success" 메시지를 반환합니다.
 * @throws 404 "등록되지 않은 이용자입니다."  오류를 반환할 수 있습니다.
 */

export const FaceRegistrationStatus = async () => {
  try {
    const response = await apiClient.get("/faces");
    console.log(response);
    return { success: true, message: response.data.message };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      if (error.response.status === 404) {
        return { success: false, message: error.response.data.message };
      }
    }
    throw error;
  }
};

/**
 * 얼굴 정보 등록하기
 * @remarks
 * POST 요청을 '/api/v1/faces' 엔드포인트에 보냅니다. 성공시 메시지를 반환합니다.
 * @returns  "Success" 메시지를 반환합니다.
 * @throws 401 "유효하지 않은 요청입니다." 또는 422 "처리할 수 없는 얼굴 이미지 입니다." 오류를 반환할 수 있습니다.
 */

interface UploadFaceResponse {
  success: boolean;
  message: string;
}

export const uploadFace = async (file: File): Promise<UploadFaceResponse> => {
  const formData = new FormData();
  formData.append("faceImage", file);
  console.log(file);

  try {
    const response = await apiClient.post<UploadFaceResponse>(
      "/faces",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return {
      success: true,
      message: response.data.message,
    };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      if (error.response.status === 422) {
        return {
          success: false,
          message: "얼굴 인식이 실패했습니다. 다시 찍어주세요.",
        };
      }
      return {
        success: false,
        message: error.response.data.message || "An unknown error occurred",
      };
    }
    return {
      success: false,
      message: "An error occurred while connecting to the server.",
    };
  }
};
