import { useEffect, useState } from "react";
import NavBar from "../../components/Navbar";
import BottomTabBar from "../../components/BottomTabBar";
import { useUserStore } from "../../store/userStore";
import { getMonthlyPayments, PaymentData } from "../../api/paymentsAPI";
// <a href="https://www.flaticon.com/kr/free-icons/-" title="신용 카드 결제 아이콘">신용 카드 결제 아이콘 제작자: SBTS2018 - Flaticon</a>
import totalpayment from "/assets/images/main/totalpayment.png";
// <a href="https://www.flaticon.com/kr/free-icons/" title="돈 아이콘">돈 아이콘 제작자: monkik - Flaticon</a>
import totalsubsidy from "/assets/images/main/totalsubsidy.png";
import yours from "/assets/images/main/yours.png";

function MainPage() {
  const userInfo = useUserStore((state) => state);
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
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
    const fetchPayments = async () => {
      try {
        const response = await getMonthlyPayments(getCurrentDate());
        setPaymentData(response.data);
      } catch (error) {
        console.error("Failed to fetch payment data:", error);
      }
    };

    fetchPayments();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCarouselIndex((prevIndex) => (prevIndex + 1) % carouselItems.length);
    }, 3000); // Rotate every 3 seconds

    return () => clearInterval(timer);
  }, [carouselItems.length]);

  return (
    <div className="flex flex-col min-h-screen bg-bg-color overflow-hidden pb-16">
      <NavBar />
      <div className="p-4">
        <div className="text-center mt-4">
          {userInfo && userInfo.empName ? (
            <h1 className="text-4xl font-hyemin-bold text-white">
              {userInfo.empName} 님의 {today.getMonth() + 1}월
            </h1>
          ) : (
            <h1 className="text-4xl font-hyemin-bold text-white">
              Loading or error...
            </h1>
          )}
          <p className="text-4xl mt-2 font-hyemin-bold text-white">BBAP 기록</p>
          <div
            className="mt-4 w-full bg-amber-50 rounded-lg z-0"
            style={{ height: "30rem" }}
          >
            <div className="z-10 pt-14">
              {paymentData && carouselItems.length > 0 && (
                <>
                  <div className="text-5xl font-hyemin-bold mb-6">
                    {carouselItems[carouselIndex].label}
                  </div>
                  <img
                    src={carouselItems[carouselIndex].picture}
                    alt="Carousel Image"
                    className="h-40 mb-6 mx-auto"
                  />
                  <p className="text-4xl font-hyemin-bold text-primary-color">
                    {carouselItems[carouselIndex].value}
                  </p>
                </>
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
