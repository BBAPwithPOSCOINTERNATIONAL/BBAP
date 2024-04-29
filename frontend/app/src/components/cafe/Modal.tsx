import React, { ReactNode } from "react";
import useCartStore from "../../store/cartStore";
import { useNavigate } from "react-router-dom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const navigate = useNavigate();
  const { resetCart } = useCartStore();

  const handleCancelOrder = () => {
    resetCart();
    navigate("/cafemain");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg shadow-lg max-w-sm w-full">
        {children}
        <div className="flex justify-center mt-4 space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-300 text-white rounded hover:bg-blue-700 font-bold"
          >
            돌아가기
          </button>
          <button
            onClick={handleCancelOrder}
            className="px-4 py-2 bg-red-300 text-white rounded hover:bg-red-700 font-bold"
          >
            주문취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
