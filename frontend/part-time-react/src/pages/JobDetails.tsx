import React from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // useParams ඕනේ URL එකේ ID එක ගන්න
import { jobsData } from '../data/jobsData'; // හදපු data ටික import කරන්න
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { MapPin, Clock, DollarSign, Calendar, Users, ArrowLeft } from 'lucide-react';


const JobDetails: React.FC = () => {
  const { id } = useParams(); // URL එකෙන් ID එක ගන්නවා (උදා: /job/1)
  const navigate = useNavigate();

  // ID එකට අදාළ Job එක හොයාගන්නවා
  const job = jobsData.find(j => String(j.id) === String(id));

  // සොයාගත නොහැකි නම් error එකක් පෙන්වනවා
  if (!job) {
    return <div className="p-10 text-center">Job Not Found!</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 py-10 w-full">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-500 mb-6 font-medium">
          <ArrowLeft size={18} /> Back to Jobs
        </button>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900 mb-2">{job.title}</h1>
          <p className="text-blue-600 font-bold mb-6">{job.company}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12 border-t pt-6">
            <div className="flex items-center gap-3 text-sm text-gray-600"><MapPin className="text-yellow-500" /> {job.location}</div>
            <div className="flex items-center gap-3 text-sm font-bold text-slate-800"><DollarSign className="text-yellow-500" /> {job.salary}</div>
            <div className="flex items-center gap-3 text-sm text-gray-600"><Clock className="text-yellow-500" /> {job.time}</div>
            <div className="flex items-center gap-3 text-sm text-gray-600"><Users className="text-yellow-500" /> {job.applicants}</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h3 className="text-lg font-bold mb-4 border-l-4 border-yellow-500 pl-3">Job Description</h3>
          <p className="text-gray-600 mb-8">{job.description}</p>

          <h3 className="text-lg font-bold mb-4 border-l-4 border-yellow-500 pl-3">Requirements</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-600 mb-8">
            {job.requirements.map((req, index) => <li key={index}>{req}</li>)}
          </ul>

          <h3 className="text-lg font-bold mb-4 border-l-4 border-yellow-500 pl-3">Benefits</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-600 mb-10">
            {job.benefits.map((benefit, index) => <li key={index}>{benefit}</li>)}
          </ul>

          <button className="w-full bg-yellow-500 text-white py-4 rounded-xl font-bold hover:bg-yellow-600 transition-all">
            Apply Now
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default JobDetails;