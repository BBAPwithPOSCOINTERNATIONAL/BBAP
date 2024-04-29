import { useState } from "react";
import NavBar from "../../components/Navbar";
import BottomTabBar from "../../components/BottomTabBar";
import question from "../../assets/button/question.png";
import Modal from "../../components/calendar/subsidymodal"; // 모달 컴포넌트를 import 합니다.

function ReceiptDetail() {
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태를 저장하는 변수를 추가합니다.

  const handleQuestionClick = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />

      <div
        className="font-hyemin-bold text-4xl"
        style={{
          display: "flex",
          justifyContent: "center", // 가로 가운데 정렬
          alignItems: "center", // 세로 가운데 정렬
          padding: "1rem",
          width: "100vw",
          height: "20vh",
          backgroundColor: "#EFF7FF",
          boxShadow: "0px 3px 4px rgba(0, 0, 0, 0.3)", // 그림자 추가
          position: "fixed",
          gap: "0.7rem",
        }}
      >
        <p
          style={{
            marginTop: "4.3rem",
          }}
        >
          식당이름 <br /> 구매시간
        </p>
      </div>
      {/* question 이미지를 클릭하면 모달을 열도록 합니다. */}
      <img
        src={question}
        className="fixed bottom-28 right-0 mb-4 mr-2 cursor-pointer"
        onClick={handleQuestionClick}
      />
      {/* 모달을 렌더링합니다. isOpen 상태에 따라 모달이 열리거나 닫힙니다. */}
      {isModalOpen && <Modal onClose={() => setIsModalOpen(false)} />}
      <BottomTabBar />
    </div>
  );
}

export default ReceiptDetail;
