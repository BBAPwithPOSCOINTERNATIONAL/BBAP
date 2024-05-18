import React from "react";

interface ModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onConfirm: () => void;
  orderRoomId: string;
  selectedCafeName: string;
}

const CreateRoomModal: React.FC<ModalProps> = ({
  isOpen,
  onRequestClose,
  onConfirm,
  orderRoomId,
  selectedCafeName,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="bg-white p-8 rounded-md text-center border-black border-2">
        {orderRoomId ? (
          <>
            <h2 className="text-2xl mb-4">현재 참여중인 방이 있습니다</h2>
            <p>그래도 새로운 방을 만드시겠습니까?</p>
            <p>기존의 방은 사라집니다.</p>
          </>
        ) : (
          <>
            <h2 className="text-2xl mb-4">
              {selectedCafeName}에 <br />
              방을 만드시겠습니까?
            </h2>
          </>
        )}
        <div className="mt-8 flex justify-center gap-4">
          <button
            onClick={onRequestClose}
            className="bg-gray-300 text-black py-2 px-4 rounded"
          >
            취소
          </button>
          <button
            onClick={onConfirm}
            className="bg-primary-color text-white py-2 px-4 rounded"
          >
            만들기
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateRoomModal;
