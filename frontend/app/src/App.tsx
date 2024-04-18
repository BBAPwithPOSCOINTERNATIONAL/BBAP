import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import LoginPage from "./pages/users/LoginPage";
import { queryClient } from "./api/tanstackQuery";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
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
