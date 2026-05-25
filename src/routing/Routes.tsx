import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Homepage from "../pages/Homepage";
import HomeWrapper from "../layout/HomeWrapper";
import AdminWrapper from "../layout/admin/AdminWrapper";
import AdminDashboard from "../pages/admin/AdminDashboard";
import News from "../pages/admin/News";
import AdminProtected from "../components/AdminProtected";
import Category from "../pages/admin/Category";

const Routes = createBrowserRouter([
  {
    path: "/",
    element: <HomeWrapper />,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminProtected />,
    children: [
      {
        path: "",
        element: <AdminWrapper />,
        children: [
          {
            path: "dashboard",
            element: <AdminDashboard />,
          },
          {
            path: "news",
            element: <News />,
          },
          {
            path:"category",
            element:<Category/>
          }
        ],
      },
    ],
  },
]);

export default Routes;
