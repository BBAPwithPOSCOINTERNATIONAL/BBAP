import apiClient from "./apiClient";

interface UploadFaceResponse {
  message: string;
}

/**
 * 얼굴 등록 여부
 * @remarks
 * GET 요청을 '/api/v1/faces' 엔드포인트에 보냅니다. 성공시 메시지를 반환합니다.
 * @returns  "Success" 메시지를 반환합니다.
 * @throws 404 "등록되지 않은 이용자입니다."  오류를 반환할 수 있습니다.
 */

export const FaceRegistrationStatus = async (): Promise<{
  message: string;
}> => {
  const response = await apiClient.get("/api/v1/faces");
  return response.data;
};

/**
 * 얼굴 정보 등록하기
 * @remarks
 * POST 요청을 '/api/v1/faces' 엔드포인트에 보냅니다. 성공시 메시지를 반환합니다.
 * @returns  "Success" 메시지를 반환합니다.
 * @throws 401 "유효하지 않은 요청입니다." 또는 422 "처리할 수 없는 얼굴 이미지 입니다." 오류를 반환할 수 있습니다.
 */

export const uploadFace = async (file: File): Promise<UploadFaceResponse> => {
  const formData = new FormData();
  formData.append("faceImage", file);

  const response = await apiClient.post<UploadFaceResponse>(
    "/api/v1/faces",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};
