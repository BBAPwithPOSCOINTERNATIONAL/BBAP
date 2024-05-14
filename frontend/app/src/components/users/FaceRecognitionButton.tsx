import React from "react";

interface FaceRecognitionButtonProps {
  captured: boolean;
  onClick: () => void;
}

const FaceRecognitionButton: React.FC<FaceRecognitionButtonProps> = ({
  captured,
  onClick,
}) => {
  return (
    <button
      className="mt-4 mb-2 bg-[#6397C8] hover:bg-gray-200 text-white font-bold py-2 w-4/5 rounded-md text-2xl"
      onClick={onClick}
    >
      얼굴 인식 등록 {captured ? "✅" : ""}
    </button>
  );
};

export default FaceRecognitionButton;
