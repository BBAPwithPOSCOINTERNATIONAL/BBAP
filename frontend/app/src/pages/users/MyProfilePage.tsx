import { useState, ReactNode, useEffect } from "react";
import NavBar from "../../components/Navbar";
import BottomTabBar from "../../components/BottomTabBar";
import IdPhoto from "/assets/images/image1.png";
import guide from "/assets/images/guideLine.png";
// import { FaceRegistrationStatus, uploadFace } from "../../api/faceAPI";

interface ModalProps {
  isOpen: boolean;
  children: ReactNode;
}

function Modal({ isOpen, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg relative">
        <div className="text-center font-hyemin-bold text-2xl my-2">
          얼굴을 등록해주세요
        </div>
        <div className="text-center text-base font-hyemin-regular">
          가이드라인 안쪽으로 <br />
          얼굴을 위치시켜주세요
        </div>

        {children}
        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center z-10">
          <img src={guide} alt="Profile" className="w-40 h-40 mb-3 z-10" />
        </div>
      </div>
    </div>
  );
}

function MyProfilePage() {
  const profile = {
    name: "김싸피",
    employeeId: "1234567",
    location: "서울",
    imageUrl: IdPhoto,
  };

  const [showVideo, setShowVideo] = useState(false);
  const [captured, setCaptured] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await FaceRegistrationStatus();
  //       // console.log("API Response:", response);
  //     } catch (error) {
  //       console.error("API Error:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  const handleCameraAccess = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      setStream(mediaStream);
      setShowVideo(true);
      setModalOpen(true);
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  useEffect(() => {
    const videoElement = document.getElementById(
      "cameraPreview"
    ) as HTMLVideoElement | null;
    if (videoElement && stream) {
      videoElement.srcObject = stream;
    }
  }, [modalOpen, stream]);

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
      setModalOpen(false);
    } else {
      console.error("Failed to get drawing context from canvas");
    }
  };

  const handleCloseModal = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
    setModalOpen(false); // 모달 상태를 false로 변경하여 닫습니다.
    setShowVideo(false); // 비디오 표시 상태도 업데이트
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="flex-grow p-5">
        <div className="bg-white shadow-lg rounded-lg p-5">
          <div className="flex flex-col items-center">
            <img
              className="w-24 h-24 mb-4"
              src={profile.imageUrl}
              alt="Profile"
            />
            <button
              className="mt-4 bg-primary-color hover:bg-gray-200 text-white font-bold py-2 px-4 rounded"
              onClick={handleCameraAccess}
            >
              얼굴 인식 등록 {captured ? " ✅" : ""}
            </button>
            <Modal isOpen={modalOpen}>
              {showVideo && (
                <>
                  <video
                    id="cameraPreview"
                    className="scale-x-[-1] z-10"
                    autoPlay
                  ></video>
                  <div className="flex flex-row justify-center items-center mt-4">
                    {" "}
                    <button
                      className="z-30 mr-5 bg-primary-color hover:bg-gray-200 text-white font-bold py-2 px-4 rounded"
                      onClick={handleCaptureImage}
                    >
                      사진찍기
                    </button>
                    <button
                      className="z-30 ml-5 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      onClick={handleCloseModal}
                    >
                      닫기
                    </button>
                  </div>
                </>
              )}
            </Modal>
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
