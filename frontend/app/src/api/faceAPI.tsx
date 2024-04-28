import apiClient from "./apiClient";

interface UploadFaceResponse {
  message: string;
}

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

export const FaceRegistrationStatus = async (): Promise<{
  message: string;
}> => {
  const response = await apiClient.get("/api/v1/faces");
  return response.data;
};
