import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NavBar from "../../components/Navbar";
import BottomTabBar from "../../components/BottomTabBar";
import Modal from "../../components/calendar/subsidymodal";
import question from "/assets/images/button/question.png";
import ReceiptHeader from "../../components/receipt/ReceiptHeader";
import PaymentSummary from "../../components/receipt/PaymentSummary";
import receipt from "/assets/images/receipt.png";

function ReceiptDetail() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { state } = useLocation();
  const payments = state.data;

  const handleQuestionClick = () => {
    setIsModalOpen(!isModalOpen);
  };

  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex flex-col min-h-screen relative text-center items-center">
      <NavBar goBack={goBack} />
      <img
        src={receipt}
        alt="영수증 이미지"
        className="absolute top-28 w-94 h-[39rem] z-0"
        style={{ marginLeft: "2px" }}
      />
      <div className="relative z-10">
        <ReceiptHeader
          payStore={payments.payStore}
          paymentDate={payments.paymentDate}
        />
        <PaymentSummary
          paymentDetail={payments.paymentDetail}
          totalPaymentAmount={payments.totalPaymentAmount}
          useSubsidy={payments.useSubsidy}
          selfPayment={payments.selfPayment}
        />
      </div>
      <img
        src={question}
        className="fixed bottom-[65px] right-0 mb-4 mr-2 cursor-pointer z-20" // 물음표 아이콘도 상위 z-index 적용
        alt="Question"
        onClick={handleQuestionClick}
      />
      {isModalOpen && <Modal onClose={() => setIsModalOpen(false)} />}
      <BottomTabBar />
    </div>
  );
}

export default ReceiptDetail;
