import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import GetStarted from "./pages/GetStarted";
import Auth from "./pages/Auth";
import HomePage from "./pages/HomePage";
import ChatBot from "./components/chat/ChatBot";
import Layout from "./Layouts/Layout";
import NearByJobPage from "./pages/NearByJobPage";
import EmployerStep1 from "./pages/employer-registration/EmployerStep1";
import EmployerStep2 from "./pages/employer-registration/EmployerStep2";
import JobSeekerStep1 from "./pages/jobseeker-registration/JobSeekerStep1";
import JobSeekerStep2 from "./pages/jobseeker-registration/JobSeekerStep2";
import EmployerDashboard from "./pages/EmployerDashboard/EmployerDashboard";
import JobApplicants from "./pages/EmployerDashboard/JobApplicants";

import JobForm from "./pages/PostJob/JobForm";
import FindJobs from "./pages/FindJob/FindJobs";

import JobDetails from "./pages/JobDetails";
import SeekerProfile from "./pages/EmployerDashboard/SeekerProfile";

import JobSeekerDashboard from "./pages/JobseekerDashboard";
import AdminDashboardPage from "./pages/AdminDashboardPage";

import AboutPage from "./pages/AboutUs/AboutPage";
import PostJob from "./pages/PostJobs/PostJob";
import FindJob from "./pages/FindYourJob/FindJob";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="chatbot" element={<ChatBot />} />
        <Route path="nearby" element={<NearByJobPage />} />
        <Route path="/find-your-job" element={<FindJob />} />
      </Route>

      <Route path="/getstarted" element={<GetStarted />} />
      <Route path="/auth" element={<Auth />} />

      <Route path="/empDashboard" element={<EmployerDashboard />} />
      <Route path="/applicants" element={<JobApplicants />} />
      <Route path="/seekerProfile" element={<SeekerProfile />} />

      {/* Job Seeker Routes */}
      <Route path="/jobseeker/register/step1" element={<JobSeekerStep1 />} />
      <Route path="/jobseeker/register/step2" element={<JobSeekerStep2 />} />

      {/* Employer Routes */}
      <Route path="/employer/register/step1" element={<EmployerStep1 />} />
      <Route path="/employer/register/step2" element={<EmployerStep2 />} />

      {/* New Routes from GitHub */}
      <Route path="/find-jobs" element={<FindJobs />} />
      <Route path="/find-your-job" element={<FindJob />} />
      <Route path="/job/:id" element={<JobDetails />} />

      {/* Post Job Routes */}
      <Route path="/post-job" element={<JobForm />} />
      <Route path="/postJob" element={<PostJob />} />

      <Route path="/dashboard" element={<JobSeekerDashboard />} />

      <Route path="/admin-dashboard" element={<AdminDashboardPage />} />

      <Route path="/about" element={<AboutPage />} />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;
