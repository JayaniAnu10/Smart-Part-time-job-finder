// frontend/part-time-react/src/App.tsx

import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import PostJobPage from './pages/PostJob'; 



const App: React.FC = () => {
    return (
        
        <Router>
            
            <Routes>
                
                <Route path="/post-job" element={<PostJobPage />} />

                
            </Routes>
        </Router>
    );
};

export default App;