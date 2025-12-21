import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FindJobs from './pages/FindJobs';
import PostJob from './pages/PostJob';
import JobDetails from './pages/JobDetails'; 

function App() {
  return (
    <Router>
      <Routes>
        {/* '/' කියන්නේ main path එක. Site එකට ආපු ගමන් FindJobs පේන්න මෙහෙම දාමු */}
        <Route path="/" element={<FindJobs />} />
        
        {/* localhost:5173/find-jobs ගියත් මේකම පේනවා */}
        <Route path="/find-jobs" element={<FindJobs />} />
        
        {/* localhost:5173/post-job ගියාම පරණ page එක බලාගන්න පුළුවන් */}
        <Route path="/post-job" element={<PostJob />} />

        
        <Route path="/job/:id" element={<JobDetails />} />
      </Routes>
    </Router>
  );
}

export default App;