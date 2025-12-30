import React from 'react';

const HelpCard: React.FC = () => {
  return (
    <div className="bg-[#f8bd25] p-8 rounded-xl mt-6 shadow-sm">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Need Immediate Help?</h2>
      <p className="text-gray-800 mb-6 max-w-md">
        Our support team is available to assist you with any questions or concerns.
      </p>
      <button className="bg-white text-gray-900 font-semibold py-2 px-12 rounded-lg hover:bg-gray-50 transition">
        Visit Help Center
      </button>
    </div>
  );
};

export default HelpCard;