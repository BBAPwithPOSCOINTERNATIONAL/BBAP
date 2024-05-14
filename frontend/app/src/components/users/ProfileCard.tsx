import React from "react";
import Pobap from "/assets/images/hello.png";
import { useUserStore } from "../../store/userStore";
import FaceRecognitionButton from "./FaceRecognitionButton";

interface ProfileCardProps {
  captured: boolean;
  onCameraAccess: () => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  captured,
  onCameraAccess,
}) => {
  const userInfo = useUserStore((state) => state);

  return (
    <div
      className="rounded-lg"
      style={{
        backgroundImage: `url(/assets/images/card.png)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex flex-col items-center pt-24 pb-4">
        <img src={Pobap} className="w-36" />
        <FaceRecognitionButton captured={captured} onClick={onCameraAccess} />
        <div className="text-center font-hyemin-bold text-gray-500 text-sm ">
          <p>등록을 많이 할 수록 인식률이 높아집니다 :)</p>
          <p>다양한 모습을 등록해주세요</p>
        </div>
        <div className="flex flex-row items-end mt-4">
          <div>
            <img
              className="w-24 h-28 border"
              src={userInfo.empImage}
              alt="Profile"
              style={{ maxHeight: "280px" }}
            />
          </div>

          <div className="font-hyemin-bold text-lg ml-4">
            <div className="mt-2 w-full text-left">
              근무지 : {userInfo.workplace?.workplaceName}
            </div>
            <div className="mb-2 w-full text-left">
              {userInfo.empName} ({userInfo.empNo})
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
