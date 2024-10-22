import { useState, useEffect } from "react";
import NavBar from "../../components/Navbar";
import BottomTabBar from "../../components/BottomTabBar";
import Modal from "../../components/users/Modal";
import ProfileCard from "../../components/users/ProfileCard";
import { FaceRegistrationStatus, uploadFace } from "../../api/faceAPI";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../store/userStore";

function MyProfilePage() {
  const [showVideo, setShowVideo] = useState(false);
  const [captured, setCaptured] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const userInfo = useUserStore((state) => state);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await FaceRegistrationStatus();
        if (response.success) {
          setCaptured(true);
        }
      } catch (error) {
        console.error("API Error:", error);
      }
    };
    fetchData();
  }, []);

  const handleLogout = async () => {
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("accessToken");
    useUserStore.getState().reset();
    navigate("/");
  };

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
      alert("비디오 요소 또는 소스를 찾을 수 없습니다.");
      return;
    }

    const canvas = document.createElement("canvas");
    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;
    const ctx = canvas.getContext("2d");

    if (ctx) {
      ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
      canvas.toBlob(async (blob) => {
        if (blob) {
          const file = new File([blob], "faceImage.jpg", { type: "image/jpg" });
          try {
            const uploadResponse = await uploadFace(file);
            console.log("Upload status:", uploadResponse);
            if (uploadResponse.success) {
              setCaptured(true); // 이미지 업로드 성공 시 상태 업데이트
              alert("사진 등록이 완료되었습니다!");
              handleCloseModal();
            } else {
              console.error("Upload failed:", uploadResponse.message);
              alert(uploadResponse.message); // 실패 메시지를 alert로 표시
            }
          } catch (error) {
            console.error("Upload failed:", error);
            alert("얼굴 인식이 실패했습니다. 다시 찍어주세요.");
          }
        } else {
          console.error("Failed to convert canvas to blob");
          alert("이미지 처리에 실패했습니다. 다시 시도해 주세요.");
        }
      }, "image/png");
    } else {
      console.error("Failed to get drawing context from canvas");
      alert("캔버스 처리에 실패했습니다. 다시 시도해 주세요.");
    }
  };

  const handleCloseModal = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
    setModalOpen(false); // 모달 상태를 false로 변경하여 닫습니다.
    setShowVideo(false); // 비디오 표시 상태도 업데이트
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex flex-col min-h-screen pb-16">
      <NavBar goBack={goBack} />
      <div className="flex flex-row">
        <p className="text-2xl font-bold text-center mt-6 mx-auto">
          안녕하세요, {userInfo.empName} 님{" "}
        </p>
        <button
          onClick={handleLogout}
          className="bg-slate-50 text-sm p-1 px-3 rounded-md text-center text-slate-400 flex mt-8 mr-5"
        >
          로그아웃
        </button>
      </div>

      <div className="flex-grow p-4 pt-4">
        <ProfileCard captured={captured} onCameraAccess={handleCameraAccess} />
        <Modal isOpen={modalOpen} onClose={handleCloseModal}>
          {showVideo && (
            <>
              <video
                id="cameraPreview"
                className="scale-x-[-1] z-10"
                autoPlay
              ></video>
              <div className="flex flex-row justify-center items-center mt-4">
                <button
                  className="z-30 mr-5 bg-slate-200 hover:bg-slate-400 hover:text-white font-bold py-2 px-4 rounded-md"
                  onClick={handleCloseModal}
                >
                  닫기
                </button>
                <button
                  className="z-30 ml-5 bg-primary-color text-white font-bold py-2 px-4 rounded-md"
                  onClick={handleCaptureImage}
                >
                  사진찍기
                </button>
              </div>
            </>
          )}
        </Modal>
      </div>
      <BottomTabBar />
    </div>
  );
}

export default MyProfilePage;
