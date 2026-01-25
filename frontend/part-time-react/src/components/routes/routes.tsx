import AuthLayout from "@/Layouts/AuthLayout";
import Layout from "@/Layouts/Layout";
import AboutPage from "@/pages/AboutUs/AboutPage";
import AdminDashboardPage from "@/pages/AdminDashboardPage";
import Auth from "@/pages/Auth";
import ContactPage from "@/pages/Contact/ContactPage";
import EmployerStep1 from "@/pages/employer-registration/EmployerStep1";
import EmployerStep2 from "@/pages/employer-registration/EmployerStep2";
import EmployerDashboard from "@/pages/EmployerDashboard/EmployerDashboard";
import JobApplicants from "@/pages/EmployerDashboard/JobApplicants";
import SeekerProfile from "@/pages/EmployerDashboard/SeekerProfile";
import FindJob from "@/pages/FindYourJob/FindJob";
import JobProfile from "@/pages/FindYourJob/JobProfile";
import GetStarted from "@/pages/GetStarted";
import HomePage from "@/pages/HomePage";
import JobHistory from "@/pages/JobHistory/JobHistory";
import JobSeekerStep1 from "@/pages/jobseeker-registration/JobSeekerStep1";
import JobSeekerStep2 from "@/pages/jobseeker-registration/JobSeekerStep2";
import JobseekerDashboard from "@/pages/JobseekerDashboard";
import JobseekerProfile from "@/pages/JobseekerProfile";
import NearByJobPage from "@/pages/NearByJobPage";
import NotificationPage from "@/pages/Notifications/NotificationPage";
import JobPromotion from "@/pages/PostJobs/JobPromotion";
import PostJob from "@/pages/PostJobs/PostJob";
import PromoSuccess from "@/pages/PostJobs/PromoSuccess";
import TermsPage from "@/pages/Terms/TermsPage";
import { createBrowserRouter } from "react-router-dom";
import ChatBot from "../chat/ChatBot";
import PrivateRoute from "./PrivateRoute";

import ManageUsers from "@/pages/adminActions/ManageUsers";
import ModerateJobPosts from "@/pages/adminActions/ModerateJobPosts";
import ReviewReports from "@/pages/adminActions/ReviewReports";
import ViewAnalytics from "@/pages/adminActions/ViewAnalytics";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { path: "auth", element: <Auth /> },
      { path: "getstarted", element: <GetStarted /> },
      { path: "/seekerDashboard", element: <JobseekerDashboard /> },
    ],
  },

  {
    path: "/notifications",
    element: <NotificationPage />,
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
      { path: "terms", element: <TermsPage /> },
      { path: "contact", element: <ContactPage /> },

      { path: "/seekerProfile", element: <JobseekerProfile /> },
      { path: "jobseeker/register/step1", element: <JobSeekerStep1 /> },
      { path: "jobseeker/register/step2", element: <JobSeekerStep2 /> },
      { path: "employer/register/step1", element: <EmployerStep1 /> },
      { path: "employer/register/step2", element: <EmployerStep2 /> },
      {
        path: "empDashboard",
        element: (
          <PrivateRoute requiredRole="employer">
            <EmployerDashboard />
          </PrivateRoute>
        ),
      },
      {
        path: "promotion/:jobId",
        element: (
          <PrivateRoute requiredRole="employer">
            <JobPromotion />
          </PrivateRoute>
        ),
      },
      {
        path: "checkout-success",
        element: (
          <PrivateRoute requiredRole="employer">
            <PromoSuccess />
          </PrivateRoute>
        ),
      },
      {
        path: "seekerDashboard",
        element: (
          <PrivateRoute requiredRole="jobseeker">
            <JobseekerDashboard />
          </PrivateRoute>
        ),
      },
      {
        path: ":jobId/applicants",
        element: (
          <PrivateRoute requiredRole="employer">
            <JobApplicants />
          </PrivateRoute>
        ),
      },
      {
        path: "job-history",
        element: (
          <PrivateRoute requiredRole="jobseeker">
            <JobHistory />
          </PrivateRoute>
        ),
      },
      {
        path: "seekerProfile/:id",
        element: (
          <PrivateRoute requiredRole="employer">
            <SeekerProfile />
          </PrivateRoute>
        ),
      },
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
      { path: "contact", element: <ContactPage /> },
      { path: "terms", element: <TermsPage /> },
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
        path: "postJob",
        element: (
          <PrivateRoute requiredRole="employer">
            <PostJob />
          </PrivateRoute>
        ),
      },
      {
        path: "jobs/:id",
        element: (
          <PrivateRoute requiredRole="jobseeker">
            <JobProfile />
          </PrivateRoute>
        ),
      },

      {
        path: "admin/dashboard",
        element: <AdminDashboardPage />,
      },

      {
        path: "/admin/dashboard",
        element: <AdminDashboardPage />,
      },
      {
        path: "/admin/manage-users",
        element: <ManageUsers />,
      },
      {
        path: "/admin/moderate-job-posts",
        element: <ModerateJobPosts />,
      },
      {
        path: "/admin/review-reports",
        element: <ReviewReports />,
      },
      {
        path: "/admin/view-analytics",
        element: <ViewAnalytics />,
      },
    ],
  },
]);

export default router;
