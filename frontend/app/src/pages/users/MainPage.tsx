import { useEffect, useState } from "react";
import NavBar from "../../components/Navbar";
import BottomTabBar from "../../components/BottomTabBar";
import { useUserStore } from "../../store/userStore";
import { getMonthlyPayments, PaymentData } from "../../api/paymentsAPI";
import totalpayment from "/assets/images/main/totalpayment.png";
import totalsubsidy from "/assets/images/main/totalsubsidy.png";
import yours from "/assets/images/main/yours.png";
import Loading from "../../components/Loading";
import { useNavigate } from "react-router-dom";

function MainPage() {
  const userInfo = useUserStore((state) => state);
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [dynamicHeight, setDynamicHeight] = useState("27rem");

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
    const fetchPayments = async () => {
      try {
        const response = await getMonthlyPayments(getCurrentDate());
        setPaymentData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch payment data:", error);
        setIsLoading(false);
      }
    };

    fetchPayments();
  }, []);

  const changeCarousel = (newIndex: number) => {
    setCarouselIndex(newIndex % carouselItems.length);
  };

  const handleNext = () => {
    changeCarousel(carouselIndex + 1);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      changeCarousel(carouselIndex + 1);
    }, 3000);

    return () => clearInterval(timer);
  }, [carouselIndex, carouselItems.length]);

  if (isLoading) {
    return <Loading />;
  }
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex flex-col min-h-screen bg-bg-color overflow-hidden pb-16">
      <NavBar goBack={goBack} />
      <div className="p-4">
        <div className="text-center mt-2">
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
            style={{ height: dynamicHeight }}
            onTouchStart={handleNext}
          >
            <div className="z-10 pt-14">
              {paymentData && carouselItems.length > 0 && (
                <>
                  <div className="text-4xl font-hyemin-bold mb-8">
                    {carouselItems[carouselIndex].label}
                  </div>
                  <img
                    src={carouselItems[carouselIndex].picture}
                    alt="Carousel Image"
                    className="h-40 mb-8 mx-auto"
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
