import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import GetStarted from "./pages/GetStarted";
import Auth from "./pages/Auth";

import JobSeekerStep1 from "./pages/jobseeker-registration/JobSeekerStep1";
import JobSeekerStep2 from "./pages/jobseeker-registration/JobSeekerStep2";
import JobSeekerStep3 from "./pages/jobseeker-registration/JobSeekerStep3";

import EmployerStep1 from "./pages/employer-registration/EmployerStep1";
import EmployerStep2 from "./pages/employer-registration/EmployerStep2";
import EmployerStep3 from "./pages/employer-registration/EmployerStep3";
import HomePage from "./pages/HomePage";
import ChatBot from "./components/chat/ChatBot";
import Layout from "./Layouts/Layout";
import NearByJobPage from "./pages/NearByJobPage";

import JobForm from "./pages/PostJob/JobForm";
import FindJobs from './pages/FindJobs';

import JobDetails from './pages/JobDetails'; 

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="chatbot" element={<ChatBot />} />
        <Route path="nearby" element={<NearByJobPage />} />
      </Route>

      <Route path="/getstarted" element={<GetStarted />} />
      <Route path="/auth" element={<Auth />} />

      {/* Job Seeker Routes */}
      <Route path="/jobseeker/register/step1" element={<JobSeekerStep1 />} />
      <Route path="/jobseeker/register/step2" element={<JobSeekerStep2 />} />
      <Route path="/jobseeker/register/step3" element={<JobSeekerStep3 />} />

      {/* Employer Routes */}
      <Route path="/employer/register/step1" element={<EmployerStep1 />} />
      <Route path="/employer/register/step2" element={<EmployerStep2 />} />
      <Route path="/employer/register/step3" element={<EmployerStep3 />} />

      {/* New Routes from GitHub */}
      <Route path="/find-jobs" element={<FindJobs />} />
      <Route path="/job/:id" element={<JobDetails />} />
      
      {/* Post Job Routes */}
      <Route path="/post-job" element={<JobForm />} />
      

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;