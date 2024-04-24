import React, { useState } from "react";
import NavBar from "../../components/Navbar";
import BottomTabBar from "../../components/BottomTabBar";
import IdPhoto from "../../assets/image1.png";

function MyProfilePage() {
  const profile = {
    name: "김싸피",
    employeeId: "1234567",
    location: "서울",
    imageUrl: IdPhoto, // Corrected image URL assignment
  };

  const [showVideo, setShowVideo] = useState(false);
  const [captured, setCaptured] = useState(false);

  const handleCameraAccess = async () => {
    try {
      setShowVideo(true);
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      // Do something with the camera stream, such as displaying it in a video element
      console.log(stream);
      const videoElement = document.getElementById(
        "cameraPreview"
      ) as HTMLVideoElement;
      if (videoElement) {
        videoElement.srcObject = stream;
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  const handleCaptureImage = async () => {
    const videoElement = document.getElementById(
      "cameraPreview"
    ) as HTMLVideoElement;

    if (!videoElement || !videoElement.srcObject) {
      console.error("Video element or source not found");
      return;
    }

    const canvas = document.createElement("canvas");
    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;
    const ctx = canvas.getContext("2d");

    if (ctx) {
      ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
      const image = canvas.toDataURL("image/png");
      console.log("Captured Image URL:", image);

      // 종료 처리 추가
      const stream = videoElement.srcObject as MediaStream;
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop()); // 스트림의 모든 트랙을 종료
      videoElement.srcObject = null; // 비디오 요소에서 스트림 제거

      setShowVideo(false); // 비디오 표시 상태 업데이트
      setCaptured(true);
    } else {
      console.error("Failed to get drawing context from canvas");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="flex-grow p-5">
        <div className="bg-white shadow-lg rounded-lg p-5">
          <div className="flex flex-col items-center">
            <img className="w-24 h-25" src={profile.imageUrl} alt="Profile" />
            {showVideo && <video id="cameraPreview" autoPlay></video>}
            <button
              className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => {
                handleCameraAccess();
              }}
            >
              얼굴 인식 등록 {captured ? " ✅" : ""}
            </button>
            {showVideo && (
              <button
                className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => {
                  handleCaptureImage();
                }}
              >
                사진찍기
              </button>
            )}
            <h1 className="text-2xl font-bold mt-2">{profile.name} 님</h1>
            <div className="bg-blue-200 rounded-lg p-2 mt-2 w-64 text-center">
              <p className="text-gray-600 font-hyemin-bold">
                근무지 : {profile.location}
              </p>
            </div>
            <div className="bg-blue-200 rounded-lg p-2 mt-2 w-64 text-center">
              <p className="text-gray-600 font-hyemin-bold">
                사번 : {profile.employeeId}
              </p>
            </div>
          </div>
        </div>
      </div>
      <BottomTabBar />
    </div>
  );
}

export default MyProfilePage;
