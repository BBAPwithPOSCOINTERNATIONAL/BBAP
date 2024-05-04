import NavBar from "../../components/Navbar";
import BottomTabBar from "../../components/BottomTabBar";
import { useEffect, useState } from "react";
import { useUserStore } from "../../store/userStore";
import { getMonthlyPayments, PaymentData } from "../../api/paymentsAPI";

function MainPage() {
  // const [error, setError] = useState<string | null>(null);
  const userInfo = useUserStore((state) => state);
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null);
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
        // console.log(response.data);
        setPaymentData(response.data);
      } catch (error) {
        console.error("Failed to fetch payment data:", error);
      }
    };

    fetchPayments();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-bg-color overflow-hidden">
      <NavBar />
      <div className="p-4">
        <div className="text-center mt-8">
          {userInfo && userInfo.empName ? (
            <h1 className="text-4xl font-hyemin-bold text-white">
              {userInfo.empName} 님의 {today.getMonth() + 1}월
            </h1>
          ) : (
            <h1 className="text-4xl font-hyemin-bold text-white">
              Loading or error...
            </h1>
          )}
          <p className="text-4xl mt-4 font-hyemin-bold text-white">BBAP 로그</p>
          <div className="mt-8">
            {paymentData && (
              <>
                <div className="text-2xl font-hyemin-bold text-white">
                  총 결제 금액
                </div>
                <p className="text-2xl font-hyemin-bold text-primary-color text-white">
                  {paymentData.totalPaymentAmountSum.toLocaleString()} 원
                </p>
                <div className="text-2xl font-hyemin-bold mt-4 text-white">
                  총 지원금
                </div>
                <p className="text-2xl font-hyemin-bold text-white">
                  {paymentData.useSubsidySum.toLocaleString()} 원
                </p>
                <div className="text-2xl font-hyemin-bold mt-4 text-white">
                  본인부담금
                </div>
                <p className="text-2xl font-hyemin-bold text-white">
                  {paymentData.selfPaymentSum.toLocaleString()} 원
                </p>
              </>
            )}
          </div>
        </div>
      </div>
      <BottomTabBar />
    </div>
  );
}

export default MainPage;
