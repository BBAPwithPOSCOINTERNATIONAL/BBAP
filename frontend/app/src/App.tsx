import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./api/tanstackQuery";

// Page들
import LoginPage from "./pages/users/LoginPage";
import MainPage from "./pages/users/MainPage";
import CafeMainPage from "./pages/CafeMainPage";
import RestaurantMainPage from "./pages/RestaurantMainPage";
import MyReceiptPage from "./pages/MyReceiptPage";
import MyProfilePage from "./pages/users/MyProfilePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
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
