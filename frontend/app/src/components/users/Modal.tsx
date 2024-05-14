import React, { ReactNode } from "react";
import guide from "/assets/images/guideLine.png";

interface ModalProps {
  isOpen: boolean;
  children: ReactNode;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, children, onClose }) => {
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
        <div className="absolute flex top-32 left-16 justify-center items-center z-10">
          <img src={guide} alt="Profile" className="w-40 h-40 mb-3 z-10" />
        </div>
      </div>
    </div>
  );
};

export default Modal;
