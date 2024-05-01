import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./api/tanstackQuery";
import AdminLoginPage from "./pages/admin/AdminLoginPage";
import AdminInquiryPage from "./pages/admin/AdminPage";
import PeriodInquiryPage from "./pages/admin/PeriodInquiryPage";
import "./service/initFirebase.js";
import "./service/foregroundMessage.js";

// Page들
import LoginPage from "./pages/users/LoginPage";
import MainPage from "./pages/users/MainPage";
import CafeMainPage from "./pages/cafe/CafeMainPage";
import RestaurantMainPage from "./pages/RestaurantMainPage";
import MyReceiptPage from "./pages/myReceipt/MyReceiptPage";
import MyProfilePage from "./pages/users/MyProfilePage";
import TogetherOrderPage from "./pages/cafe/TogetherOrderPage";
import MenuDetailPage from "./pages/cafe/MenuDetailPage";
import CartPage from "./pages/cafe/CartPage";
import ReceiptDetail from "./pages/myReceipt/ReceiptDetail";
import MoreDetail from "./pages/myReceipt/MoreDetailPage";
import RoulettePage from "./pages/cafe/RoulettePage";
import NotificationPage from "./pages/NotificationPage.js";

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
		path: "together",
		element: <TogetherOrderPage />,
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
		path: "roulette",
		element: <RoulettePage />,
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
