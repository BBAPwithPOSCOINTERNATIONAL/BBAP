import gameModal from "/assets/images/gameModal.png";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const GameModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 text-white font-hyemin-bold flex items-center justify-center">
      <div className="bg-light-primary-color p-5 rounded-lg w-18/25 text-center">
        <h2 className="mb-3 text-3xl">룰렛 게임을</h2>
        <h2 className="mb-4 text-3xl">시작하시겠습니까?</h2>
        <div className="flex justify-center mb-4">
          <img src={gameModal} alt="game modal" />
        </div>
        <div className="text-lg">게임을 시작하시면</div>
        <div className="mb-5 text-lg">주문 내역 추가나 변경이 불가합니다</div>

        <button
          onClick={onClose}
          className="w-1/3 bg-primary-color hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mx-2 text-2xl"
        >
          취소
        </button>
        <button
          onClick={onConfirm}
          className="w-1/3 bg-primary-color hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mx-2 text-2xl"
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default GameModal;
