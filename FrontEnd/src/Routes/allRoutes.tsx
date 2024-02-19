import { Navigate } from "react-router-dom";

import Login from "../pages/Authentication/Login";
import Logout from "../pages/Authentication/Logout";

import LabelProject from "pages/Label/index";

const authProtectedRoutes = [
  { path: "/index", component: <LabelProject /> },
  { path: "/labelProject", component: <LabelProject /> },
  {
    path: "/",
    exact: true,
    component: <Navigate to="/labelProject" />,
  },
  { path: "*", component: <Navigate to="/labelProject" /> },
];

const publicRoutes = [
  // Authentication Page
  { path: "/logout", component: <Logout /> },
  { path: "/login", component: <Login /> },
];

export { authProtectedRoutes, publicRoutes };
