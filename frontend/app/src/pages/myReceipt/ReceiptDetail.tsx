import { useState, useEffect } from "react";
import NavBar from "../../components/Navbar";
import BottomTabBar from "../../components/BottomTabBar";
import Modal from "../../components/calendar/subsidymodal";
import { useNavigate, useLocation } from "react-router-dom";
import { format } from "date-fns";
import { getPaymentDetails } from "../../api/paymentsAPI";
import PaymentCard from "../../components/receipt/PaymentCard";
import Header from "../../components/receipt/Header";
import question from "/assets/images/button/question.png";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState | undefined;
  const { date, payments } = state || {
    date: "",
    payments: { data: { paymentList: [] } },
  };
  const [sortedPayments, setSortedPayments] = useState<Payment[]>([]);

  useEffect(() => {
    if (payments && payments.data && payments.data.paymentList.length > 0) {
      const reversedPayments = [...payments.data.paymentList].reverse();
      setSortedPayments(reversedPayments);
    }
  }, [payments]);

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

  const goBack = () => {
    navigate(-1);
  };

  const formattedDate = date ? format(new Date(date), "M월 d일") : "";

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar goBack={goBack} />
      <div className="flex-grow flex flex-col items-center justify-start my-16">
        {sortedPayments.map((payment, index) => (
          <PaymentCard
            key={index}
            payment={payment}
            onClick={handleCardClick}
          />
        ))}
      </div>
      <Header formattedDate={formattedDate} />
      <img
        src={question}
        alt="지원금 모달"
        className="fixed bottom-[65px] right-0 mb-4 mr-2 cursor-pointer"
        onClick={handleQuestionClick}
      />
      {/* 모달을 렌더링합니다. isOpen 상태에 따라 모달이 열리거나 닫힙니다. */}
      {isModalOpen && <Modal onClose={() => setIsModalOpen(false)} />}
      <BottomTabBar />
    </div>
  );
}

export default ReceiptDetail;
