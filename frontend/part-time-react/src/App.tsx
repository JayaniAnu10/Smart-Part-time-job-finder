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

      <Route path="/jobseeker/register/step1" element={<JobSeekerStep1 />} />
      <Route path="/jobseeker/register/step2" element={<JobSeekerStep2 />} />

      <Route path="/employer/register/step1" element={<EmployerStep1 />} />
      <Route path="/employer/register/step2" element={<EmployerStep2 />} />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;
