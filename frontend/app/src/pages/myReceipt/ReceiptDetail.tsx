import React, { useState } from "react";
import NavBar from "../../components/Navbar";
import BottomTabBar from "../../components/BottomTabBar";
import question from "../../assets/button/question.png";
import Modal from "../../components/calendar/subsidymodal"; // 모달 컴포넌트를 import 합니다.
import { useNavigate } from "react-router-dom";

function ReceiptDetail() {
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태를 저장하는 변수를 추가합니다.
  const navigate = useNavigate();

  const handleQuestionClick = () => {
    setIsModalOpen(!isModalOpen);
  };

  const cardData = [
    {
      foodName: "음식 이름 1",
      subsidy: "2,000",
      personalExpense: "1,000",
      price: "3,000",
    },
    {
      foodName: "음식 이름 2",
      subsidy: "3,000",
      personalExpense: "1,500",
      price: "4,500",
    },
    {
      foodName: "음식 이름 2",
      subsidy: "3,000",
      personalExpense: "1,500",
      price: "4,500",
    },
    {
      foodName: "음식 이름 2",
      subsidy: "3,000",
      personalExpense: "1,500",
      price: "4,500",
    },
    {
      foodName: "음식 이름 2",
      subsidy: "3,000",
      personalExpense: "1,500",
      price: "4,500",
    },
    {
      foodName: "음식 이름 2",
      subsidy: "3,000",
      personalExpense: "1,500",
      price: "4,500",
    },
    {
      foodName: "마지막",
      subsidy: "3,000",
      personalExpense: "1,500",
      price: "4,500",
    },
  ];

  const handleCardClick = () => {
    // 카드 클릭 시 moredetail 페이지로 이동
    navigate("/moredetail");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="flex-grow flex flex-col items-center justify-start my-32">
        {/* 카드 형식으로 각각의 카드를 렌더링 */}
        {cardData.map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-md shadow-lg p-4 py-6 mb-4 w-90 border border-neutral-400"
            style={{ borderWidth: "2px" }}
            onClick={handleCardClick}
          >
            <div className="flex justify-between">
              <p className="font-hyemin-bold text-xl">{card.foodName}</p>
              <p className="font-hyemin-bold text-xl">{card.price} 원</p>
            </div>
            <div className="font-hyemin-regular text-lg flex mt-2 gap-8 justify-between">
              <p style={{ color: "#179F0B" }}>지원금 {card.subsidy} 원</p>
              <p style={{ color: "#346186" }}>
                본인부담금 {card.personalExpense} 원
              </p>
            </div>
          </div>
        ))}
      </div>

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
          O월 OO일 사용내역
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
