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
import JobProfile from "@/pages/FindYourJob/JobProfile";
import JobApplicants from "@/pages/EmployerDashboard/JobApplicants";
import SeekerProfile from "@/pages/EmployerDashboard/SeekerProfile";
import JobSeekerStep1 from "@/pages/jobseeker-registration/JobSeekerStep1";
import JobSeekerStep2 from "@/pages/jobseeker-registration/JobSeekerStep2";
import EmployerStep2 from "@/pages/employer-registration/EmployerStep2";
import EmployerStep1 from "@/pages/employer-registration/EmployerStep1";
import TermsPage from "@/pages/Terms/TermsPage";
import ContactPage from "@/pages/Contact/ContactPage";
import JobHistory from "@/pages/JobHistory/JobHistory";
import JobseekerDashboard from "@/pages/JobseekerDashboard";
import JobseekerProfile from "@/pages/JobseekerProfile";
import JobPromotion from "@/pages/PostJobs/JobPromotion";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { path: "auth", element: <Auth /> },
      { path: "getstarted", element: <GetStarted /> },
      { path: "/seekerDashboard", element: <JobseekerDashboard /> },
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
        path: "promotion",
        element: (
          <PrivateRoute requiredRole="employer">
            <JobPromotion />
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
    ],
  },
]);

export default router;
