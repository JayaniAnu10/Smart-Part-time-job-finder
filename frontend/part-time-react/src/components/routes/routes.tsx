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
import EmployerProfile from "@/pages/EmployerProfile";
import ApplicantProfile from "@/pages/EmployerDashboard/ApplicantProfile";
import EditJob from "@/pages/PostJobs/EditJob";
import UpcomingJobDetails from "@/pages/UpcomingJobDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { path: "auth", element: <Auth /> },
      { path: "getstarted", element: <GetStarted /> },
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
        path: "job-history",
        element: (
          <PrivateRoute requiredRole="jobseeker">
            <JobHistory />
          </PrivateRoute>
        ),
      },
      {
        path: "seekerProfile",
        element: (
          <PrivateRoute requiredRole="jobseeker">
            <JobseekerProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "empProfile",
        element: (
          <PrivateRoute requiredRole="employer">
            <EmployerProfile />
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
        path: "upcoming-job/:applicationId",
        element: (
          <PrivateRoute requiredRole="jobseeker">
            <UpcomingJobDetails />
          </PrivateRoute>
        ),
      },

      {
        path: "seekerProfile/:id",
        element: (
          <PrivateRoute requiredRole="employer">
            <ApplicantProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "notifications",
        element: <NotificationPage />,
      },
      {
        path: "editJob/:jobId",
        element: (
          <PrivateRoute requiredRole="employer">
            <EditJob />
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
        path: "job-history",
        element: (
          <PrivateRoute requiredRole="jobseeker">
            <JobHistory />
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
