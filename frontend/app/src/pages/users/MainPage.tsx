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
import yours from "/assets/images/main/yours.png";
import Loading from "../../components/Loading";

function MainPage() {
  const userInfo = useUserStore((state) => state);
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [dynamicHeight, setDynamicHeight] = useState("27rem");
  const [subSidy, setSubSidy] = useState<SubsidyDetails | null>();

  useEffect(() => {
    const handleResize = () => {
      const newHeight = window.innerHeight <= 770 ? "27rem" : "30rem";
      setDynamicHeight(newHeight);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  useEffect(() => {
    const interval = setInterval(() => {
      setCarouselIndex((prevIndex) => (prevIndex + 1) % carouselItems.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [carouselItems.length]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-bg-color overflow-hidden pb-16">
      <NavBar />
      <div className="p-4">
        <div className="text-center mt-2">
          <h1 className="text-2xl font-hyemin-bold text-white">
            {userInfo.empName} 님의 {new Date().getMonth() + 1}월
          </h1>
          <p className="text-2xl mt-2 font-hyemin-bold text-white">BBAP 기록</p>
          <div className="mt-4 w-full p-4 bg-amber-50 rounded-lg z-0">
            <div className="flex items-center">
              {carouselItems.map((item, index) => (
                <div
                  key={index}
                  className="w-1/3 text-center flex flex-col items-center"
                >
                  <p>{item.label}</p>
                  <img
                    src={item.picture}
                    alt={item.label}
                    className="w-16 h-16"
                  />
                  <p>{item.value}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="text-xl font-hyemin-bold text-white mt-4">
            <p>현재 {userInfo.empName}님이 </p>
            <p className="text-2xl">사용가능한 지원금</p>{" "}
          </div>
          <div className="mt-4 w-full p-4 bg-amber-50 rounded-lg z-0 h-40">
            {subSidy?.availSubsidy}원
          </div>
        </div>
      </div>
      <BottomTabBar />
    </div>
  );
}

export default MainPage;
