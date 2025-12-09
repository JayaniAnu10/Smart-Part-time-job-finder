/*
import { Routes, Route } from "react-router-dom";
import GetStarted from "./pages/GetStarted";
import Auth from "./pages/Auth";
import JobSeekerStep1 from "./pages/jobseeker-registration/JobSeekerStep1";


export default function App() {
  return (
    
      <Routes>
        <Route path="/" element={<GetStarted />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/register/jobseeker/step1" element={<JobSeekerStep1 />} />
      </Routes>
   
  );
}
*/

/*
import EmployerStep3 from "./pages/employer-registration/EmployerStep3";

export default function App() {
  return <EmployerStep3 />; 
}
*/

/*import React from "react";
import GetStarted from "./pages/GetStarted";

export default function App() {
  return <GetStarted />; 
}*/



// src/App.tsx
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

const App: React.FC = () => {
  return (
    <Routes>
      {/* Home / Landing page */}
      <Route path="/" element={<GetStarted />} />

      {/* Auth page */}
      <Route path="/auth" element={<Auth />} />

      {/* JobSeeker Registration */}
      <Route path="/jobseeker/register/step1" element={<JobSeekerStep1 />} />
      <Route path="/jobseeker/register/step2" element={<JobSeekerStep2 />} />
      <Route path="/jobseeker/register/step3" element={<JobSeekerStep3 />} />

      {/* Employer Registration */}
      <Route path="/employer/register/step1" element={<EmployerStep1 />} />
      <Route path="/employer/register/step2" element={<EmployerStep2 />} />
      <Route path="/employer/register/step3" element={<EmployerStep3 />} />

      {/* Redirect unknown routes to home */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;
