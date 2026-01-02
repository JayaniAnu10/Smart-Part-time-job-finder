import { createBrowserRouter } from "react-router-dom";
import Layout from "@/Layouts/Layout";
import HomePage from "@/pages/HomePage";
import AboutPage from "@/pages/AboutUs/AboutPage";
import PrivateRoute from "./PrivateRoute";
import EmployerDashboard from "@/pages/EmployerDashboard/EmployerDashboard";
import Auth from "@/pages/Auth";
import GetStarted from "@/pages/GetStarted";
import FindJob from "@/pages/FindYourJob/FindJob";
import NearByJobPage from "@/pages/NearByJobPage";
import ChatBot from "../chat/ChatBot";
import PostJob from "@/pages/PostJobs/PostJob";
import AuthLayout from "@/Layouts/AuthLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { path: "auth", element: <Auth /> },
      { path: "getstarted", element: <GetStarted /> },
    ],
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "find-your-job", element: <FindJob /> },
      { path: "nearby", element: <NearByJobPage /> },
      { path: "chatbot", element: <ChatBot /> },
      { path: "about", element: <AboutPage /> },
      {
        path: "empDashboard",
        element: (
          <PrivateRoute requiredRole="employer">
            <EmployerDashboard />
          </PrivateRoute>
        ),
      },
      {
        path: "postJob",
        element: (
          <PrivateRoute requiredRole="employer">
            <PostJob />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
