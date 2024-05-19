import { useEffect, useState } from "react";
import NavBar from "../../components/Navbar";
import BottomTabBar from "../../components/BottomTabBar";
import { useUserStore } from "../../store/userStore";
import {
  getMonthlyPayments,
  PaymentData,
  getSubsidy,
  SubsidyDetails,
} from "../../api/paymentsAPI";
import totalpayment from "/assets/images/main/totalpayment.png";
import totalsubsidy from "/assets/images/main/totalsubsidy.png";
import nowsubsidy from "/assets/images/main/nowsubsidy.png";
import yours from "/assets/images/main/yours.png";
import Loading from "../../components/Loading";
import { useNavigate } from "react-router-dom";

import sadimg from "/assets/images/sad.png";

function MainPage() {
  const userInfo = useUserStore((state) => state);
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [subSidy, setSubSidy] = useState<SubsidyDetails | null>();
  const navigate = useNavigate();

  const carouselItems = paymentData
    ? [
        {
          label: "총 결제 금액",
          picture: totalpayment,
          value: paymentData.totalPaymentAmountSum.toLocaleString() + " 원",
        },
        {
          label: "총 지원금",
          picture: totalsubsidy,
          value: paymentData.useSubsidySum.toLocaleString() + " 원",
        },
        {
          label: "본인부담금",
          picture: yours,
          value: paymentData.selfPaymentSum.toLocaleString() + " 원",
        },
      ]
    : [];
  const today = new Date();

  const getCurrentDate = () => {
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    return `${year}-${month}`;
  };

  useEffect(() => {
    const fetchSubsidy = async () => {
      try {
        const response = await getSubsidy();
        setSubSidy(response.data);
      } catch (error) {
        console.error("Failed to fetch payment data:", error);
        setIsLoading(true);
      }
    };

    fetchSubsidy();
  }, []);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await getMonthlyPayments(getCurrentDate());
        setPaymentData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch payment data:", error);
        setIsLoading(true);
      }
    };

    fetchPayments();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex flex-col min-h-screen bg-bg-color overflow-hidden pb-16">
      <NavBar goBack={goBack} />
      <div className="p-4">
        <div className="text-center mt-2">
          <h1 className="text-3xl font-hyemin-bold text-white">
            {userInfo.empName}님의 {new Date().getMonth() + 1}월
          </h1>
          <p className="text-4xl mt-2 font-hyemin-bold text-white">BBAP 기록</p>
          <div className="mt-4 w-full p-4 py-8 bg-amber-50 rounded-lg z-0">
            <div className="flex items-center">
              {carouselItems.map((item, index) => (
                <div
                  key={index}
                  className="w-1/3 text-center flex flex-col items-center"
                >
                  <p className="font-bold text-lg">{item.label}</p>
                  <img
                    src={item.picture}
                    alt={item.label}
                    className="w-16 h-16 my-4"
                  />
                  <p className="font-bold ">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="text-xl font-hyemin-bold text-white mt-8">
            <p className="text-3xl">현재 사용가능한 지원금</p>{" "}
          </div>
          {/* 아직 디자인 수정 필요 */}
          <div className="mt-4 w-full p-4 bg-amber-50 rounded-lg z-0 h-36 text-[40px] font-bold flex items-center justify-center gap-6">
          {subSidy?.availSubsidy !== 0 && (
    <img src={nowsubsidy} alt="현재지원금" className="w-28 h-24" />
  )}
           <div>
  {subSidy?.availSubsidy === 0 ? (
    <div className="flex flex-col items-center">
      <img src={sadimg} alt="슬픈 이미지" className="w-16 mb-2"/>
      <p className="text-lg">현재 사용할 수 있는 지원금이 없어요</p>
    </div>
  ) : (
    `${subSidy?.availSubsidy}원`
  )}
</div>
          </div>
        </div>
      </div>
      <BottomTabBar />
    </div>
  );
}

export default MainPage;
