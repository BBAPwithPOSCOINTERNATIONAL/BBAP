import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./api/tanstackQuery";
import AdminLoginPage from "./pages/admin/AdminLoginPage";
import AdminInquiryPage from "./pages/admin/AdminPage";
import PeriodInquiryPage from "./pages/admin/PeriodInquiryPage";
// Firebase 사용하려면 아래 주석해제 해야함
import "./service/initFirebase.ts";
import "./service/foregroundMessage.js";

// Page들
import LoginPage from "./pages/users/LoginPage";
import MainPage from "./pages/users/MainPage";
import CafeMainPage from "./pages/cafe/CafeMainPage";
import RestaurantMainPage from "./pages/RestaurantMainPage";
import MyReceiptPage from "./pages/myReceipt/MyReceiptPage";
import MyProfilePage from "./pages/users/MyProfilePage";
import TogetherOrderPage from "./pages/cafe/togetherorder/TogetherOrderPage";
import MenuDetailPage from "./pages/cafe/MenuDetailPage";
import CartPage from "./pages/cafe/CartPage";
import ReceiptDetail from "./pages/myReceipt/ReceiptDetail";
import MoreDetail from "./pages/myReceipt/MoreDetailPage";
import RoulettePage from "./pages/cafe/togetherorder/RoulettePage";
import AfterPaymentPage from "./pages/cafe/AfterPaymentPage";
import WinnerPage from "./pages/cafe/togetherorder/WinnerPage";
import NotificationPage from "./pages/NotificationPage";
import TogetherMenuSelector from "./pages/cafe/togetherorder/TogetherMenuSelector.tsx";
import TogetherMenuDetail from "./pages/cafe/togetherorder/TogetherMenuDetail.tsx";
import TogetherPayment from "./pages/cafe/togetherorder/TogetherPayment.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "admin",
    element: <AdminLoginPage />,
  },
  {
    path: "admininquiry",
    element: <AdminInquiryPage />,
  },
  {
    path: "employee/:employeeId",
    element: <PeriodInquiryPage />,
  },
  {
    path: "cafemain",
    element: <CafeMainPage />,
  },
  {
    path: "main",
    element: <MainPage />,
  },
  {
    path: "profile",
    element: <MyProfilePage />,
  },
  {
    path: "restaurantmain",
    element: <RestaurantMainPage />,
  },
  {
    path: "receipt",
    element: <MyReceiptPage />,
  },
  {
    path: "receiptDetail",
    element: <ReceiptDetail />,
  },
  {
    path: "moredetail",
    element: <MoreDetail />,
  },
  {
    path: "together/:roomId",
    element: <TogetherOrderPage />,
  },
  {
    path: "together/:roomId/menus",
    element: <TogetherMenuSelector />
  },
  {
    path: "together/:roomId/detail",
    element: <TogetherMenuDetail />
  },
  {
    path: "detail",
    element: <MenuDetailPage />,
  },
  {
    path: "cart",
    element: <CartPage />,
  },
  {
    path: "together/:roomId/roulette",
    element: <RoulettePage />,
  },
  {
    path: "together/:roomId/order",
    element: <TogetherPayment />,
  },
  {
    path: "after",
    element: <AfterPaymentPage />,
  },
  {
    path: "together/:roomId/winner",
    element: <WinnerPage />,
  },
  {
    path: "notification",
    element: <NotificationPage />,
  },
]);

function App() {
  return (
    <>
      <div>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </div>
    </>
  );
}

export default App;
