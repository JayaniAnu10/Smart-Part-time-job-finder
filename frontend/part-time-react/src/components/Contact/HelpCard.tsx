import React from 'react';

const HelpCard: React.FC = () => {
  return (
    <div className="bg-[#f8bd25] p-8 rounded-xl mt-6 shadow-sm">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Need Immediate Help?</h2>
      <p className="text-gray-800 mb-6 max-w-md">
        Our support team is available to assist you with any questions or concerns.
      </p>
      
      <button 
        className="bg-white text-gray-900 font-semibold py-3 px-12 rounded-lg 
                   hover:bg-gray-100 
                   /* Click කරන විට පසුබිම කහ පාට කර අකුරු කළු කරමු */
                   active:bg-[#f8bd25] 
                   active:text-gray-900
                   active:scale-95
                   border-2 border-transparent
                   active:border-black/10
                   transition-all duration-150 shadow-md"
        onClick={() => window.open('https://help.daybee.lk', '_blank')}
      >
        Visit Help Center
      </button>
    </div>
  );
};

export default HelpCard;