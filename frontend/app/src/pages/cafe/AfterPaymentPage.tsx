import useCartStore from "../../store/cartStore";
import useContentStore from "../../store/contentStore";
import { useLocation, useNavigate } from "react-router-dom";

function AfterPaymentPage() {
  const navigate = useNavigate();
  const setContent = useContentStore((state) => state.setContent);

  const { resetCart } = useCartStore((state) => ({
    resetCart: state.resetCart,
  }));
  const location = useLocation();

  const handleClick = () => {
    setContent("history");
    resetCart();
    navigate("/cafemain");
  };

  return (
    <>
      <div className="container bg-[#4786C1] text-white rounded font-hyemin-bold">
     
        <div className="flex justify-center items-center h-screen">
          <div className="max-w-lg">
          <h1 className="text-center text-4xl font-hyemin-bold flex-1">
          {localStorage.getItem("cafeName")}
        </h1>
            <p className="text-center text-5xl mb-2">주문번호</p>
            <p className="text-center text-6xl mb-4">
              {location.state.data.orderNum}
            </p>
            <hr className="h-1 border-1 bg-blue-100 mb-4 rounded" />
            <div className="text-center mb-8">
              <p className="text-2xl font-hyemin-regular">사번으로</p>
              <p className="text-2xl font-hyemin-regular">
                자동결제 되었습니다.
              </p>
              <p className="text-2xl font-hyemin-regular">
                제조가 완료되면 알려드리겠습니다.
              </p>
            </div>
            <button
              onClick={handleClick}
              className="w-full bg-primary-color text-white  rounded-md p-2 font-hyemin-bold text-center text-3xl"
            >
              확인
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AfterPaymentPage;
