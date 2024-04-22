import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import LoginPage from "./pages/users/LoginPage";
import { queryClient } from "./api/tanstackQuery";
import AdminLoginPage from "./pages/admin/AdminLoginPage";
import AdminInquiryPage from "./pages/admin/AdminInquiryPage";

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
