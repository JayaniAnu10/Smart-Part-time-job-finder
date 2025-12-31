import React from 'react';

const TermsHeader: React.FC = () => {
  return (
    <div className="mb-8 ml-2"> {/* පොඩි margin එකක් පාවිච්චි කළා box එක එක්ක align වෙන්න */}
      <h1 className="text-[38px] font-bold text-[#1a2b4b] mb-2 tracking-tight">
        Terms & Conditions
      </h1>
      <p className="text-[17px] text-[#64748b]">
        Last updated: January 2025
      </p>
    </div>
  );
};

export default TermsHeader;