import {
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import LoginPage from "./pages/users/LoginPage";
import { queryClient } from "./api/tanstackQuery";
import AdminLoginPage from "./pages/admin/AdminLoginPage";
import AdminInquiryPage from "./pages/admin/AdminPage";
import PeriodInquiryPage from "./pages/admin/PeriodInquiryPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/admin",
    element: <AdminLoginPage />,
  },
  {
    path: "/admininquiry",
    element: <AdminInquiryPage />,
  },
  {
    path: "/employee/:employeeId",
    element: <PeriodInquiryPage />,
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
