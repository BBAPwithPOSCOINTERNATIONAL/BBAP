import { useState, ReactNode, useEffect } from "react";
import NavBar from "../../components/Navbar";
import BottomTabBar from "../../components/BottomTabBar";
import IdPhoto from "/assets/images/image1.png";
import guide from "/assets/images/guideLine.png";
import { FaceRegistrationStatus, uploadFace } from "../../api/faceAPI";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../store/userStore";
import Pobap from "/assets/images/hello.png";

interface ModalProps {
  isOpen: boolean;
  children: ReactNode;
}

function Modal({ isOpen, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg relative w-4/5">
        <div className="text-center font-hyemin-bold text-2xl my-2">
          얼굴을 등록해주세요
        </div>
        <div className="text-center text-base font-hyemin-regular mb-2">
          얼굴을 가이드라인 안쪽으로 위치시켜주세요
        </div>

        {children}
        <div className="absolute flex top-32 left-20 justify-center items-center z-10">
          <img src={guide} alt="Profile" className="w-40 h-40 mb-3 z-10" />
        </div>
      </div>
    </div>
  );
}

function MyProfilePage() {
  const profile = {
    imageUrl: IdPhoto,
  };

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
          const file = new File([blob], "faceImage.png", { type: "image/png" });
          try {
            const uploadResponse = await uploadFace(file);
            console.log("Upload status:", uploadResponse);
            if (uploadResponse.success) {
              setCaptured(true); // 이미지 업로드 성공 시 상태 업데이트
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

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="flex flex-row justify-center items-end mt-6 ">
        <img src={Pobap} className="w-16 mr-3" />
        <h1 className="text-2xl font-bold text-center mr-4">
          안녕하세요, {userInfo.empName} 님{" "}
        </h1>
      </div>
      <div className="flex-grow p-4 pt-4">
        <div
          className=" shadow-lg rounded-lg px-5 py-4"
          style={{
            boxShadow:
              "4px 4px 8px rgba(0, 0, 0, 0.1), -4px -4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div className="flex flex-col items-center">
            <img
              className="w-64 h-84 mb-2 mt-4"
              src={userInfo.empImage}
              alt="Profile"
              style={{ maxHeight: "300px" }}
            />
            <button
              className="mt-4 mb-2 bg-primary-color hover:bg-gray-200 text-white font-bold py-3 px-24 rounded-md text-2xl"
              onClick={handleCameraAccess}
            >
              얼굴 인식 등록 {captured ? "✅" : ""}
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
            <div className="bg-blue-100 rounded-md p-4 mt-2 mb-2 py-3 px-28 text-center ">
              <p className="text-gray-600 font-hyemin-bold text-lg">
                근무지 : {userInfo.workplace?.workplaceName}
              </p>
            </div>
            <div className="bg-blue-100 rounded-md p-4 mt-2 mb-2 py-3 px-24 text-center">
              <p className="text-gray-600 font-hyemin-bold text-lg">
                사번 : {userInfo.empNo}
              </p>
            </div>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="bg-slate-50 text-sm p-1 px-3 rounded-md text-slate-400 mx-auto flex mt-4"
        >
          로그아웃
        </button>
      </div>

      <BottomTabBar />
    </div>
  );
}

export default MyProfilePage;
