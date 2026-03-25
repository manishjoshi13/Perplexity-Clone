import { createBrowserRouter } from "react-router-dom";
import Register from "../features/auth/pages/Register";
import Login from "../features/auth/pages/Login";
import ProtectedRoute from "../features/auth/components/protectedRoute";
import Dashboard from "../features/chats/pages/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element:<ProtectedRoute>
      <Dashboard/>
    </ProtectedRoute> ,
  },
  {
    path: "/register",
    element: <Register/>,
    },
  {
    path: "/login",
    element: <Login/>,
    },
]);

export default router;