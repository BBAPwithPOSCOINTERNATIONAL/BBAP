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
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center text-center
    "
    >
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-4/5 ">
        {children}
        <div className="flex justify-center mt-4 space-x-8">
          <button
            onClick={handleCancelOrder}
            className="px-2 py-2 bg-slate-400 text-white rounded hover:bg-slate-700 font-bold text-lg w-28"
          >
            <p>주문취소</p>
          </button>
          <button
            onClick={onClose}
            className="px-2 py-2 bg-primary-color rounded text-white hover:bg-blue-700 font-bold text-lg w-28"
          >
            주문계속
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
