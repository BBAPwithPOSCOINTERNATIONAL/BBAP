import { useState } from "react";
import NavBar from "../../components/Navbar";
import BottomTabBar from "../../components/BottomTabBar";
import question from "/assets/images/button/question.png";
import Modal from "../../components/calendar/subsidymodal"; // 모달 컴포넌트를 import 합니다.
import { useNavigate, useLocation } from "react-router-dom";
import { format } from "date-fns";
import { getPaymentDetails } from "../../api/paymentsAPI";

interface Payment {
  historyId: number;
  paymentDetail: string;
  totalPaymentAmount: number;
  useSubsidy: number;
  selfPayment: number;
}

interface LocationState {
  date: string;
  payments: {
    data: {
      paymentList: Payment[];
    };
  };
}

function ReceiptDetail() {
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태를 저장하는 변수를 추가합니다.
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState | undefined;
  const { date, payments } = state || {
    date: "",
    payments: { data: { paymentList: [] } },
  };

  const handleQuestionClick = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleCardClick = async (historyId: number) => {
    try {
      const paymentDetails = await getPaymentDetails(historyId);
      console.log("Payment Details:", paymentDetails);
      navigate("/moredetail", { state: paymentDetails });
    } catch (error) {
      console.error("Failed to fetch payment details:", error);
    }
  };

  const formattedDate = date ? format(new Date(date), "M월 d일") : "";

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="flex-grow flex flex-col items-center justify-start my-32">
        {/* 카드 형식으로 각각의 카드를 렌더링 */}
        {payments.data.paymentList.map((payment, index) => (
          <div
            key={index}
            className="bg-white rounded-md shadow-lg p-4 py-6 mb-4 w-90 border border-neutral-400"
            style={{ borderWidth: "2px" }}
            onClick={() => handleCardClick(payment.historyId)}
          >
            <div className="flex justify-between">
              <p className="font-hyemin-bold text-xl">
                {payment.paymentDetail}
              </p>
              <p className="font-hyemin-bold text-xl">
                {payment.totalPaymentAmount} 원
              </p>
            </div>
            <div className="font-hyemin-regular text-lg flex mt-2 gap-8 justify-between">
              <p style={{ color: "#179F0B" }}>지원금 {payment.useSubsidy} 원</p>
              <p style={{ color: "#346186" }}>
                본인부담금 {payment.selfPayment} 원
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
        <div
          style={{
            marginTop: "4.3rem",
          }}
        >
          <p>{formattedDate} 사용내역</p>
        </div>
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
