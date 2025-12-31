import React from 'react';
import TermsHeader from '../../components/Terms/TermsHeader';
import TermsSection from '../../components/Terms/TermsSection';

const TermsPage: React.FC = () => {
  
  const termsData = [
    {
      number: 1,
      title: "Acceptance of Terms",
      content: "By accessing and using DayBee.lk, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these terms, please do not use our service."
    },
    {
      number: 2,
      title: "User Accounts",
      
      subText: "To use certain features of our platform, you must register for an account. You agree to:",
      content: [
        "Provide accurate and complete information",
        "Maintain the security of your password and account",
        "Notify us immediately of any unauthorized use",
        "Be responsible for all activities under your account"
      ]
    },
    {
      number: 3,
      title: "Job Postings",
      content: "Employers posting jobs on DayBee.lk must ensure that all job postings are accurate, lawful, and do not violate any applicable laws or regulations. We reserve the right to remove any job posting that violates our policies."
    },
    {
      number: 4,
      title: "User Conduct",
      content: [
        "Post false or misleading information",
        "Harass or harm other users",
        "Violate any laws or regulations",
        "Attempt to gain unauthorized access to our systems",
        "Use the platform for any illegal purpose"
      ]
    },
    {
      number: 5,
      title: "Payment Terms",
      content: "Payment terms for premium features and services will be clearly communicated before purchase. All payments are processed securely through our payment partners."
    },
    {
      number: 6,
      title: "Privacy Policy",
      content: "Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, and protect your personal information."
    },
    {
      number: 7,
      title: "Limitation of Liability",
      content: "DayBee.lk acts as a platform connecting job seekers and employers. We are not responsible for the actions, conduct, or content of users. Use of our service is at your own risk."
    },
    {
      number: 8,
      title: "Modifications to Terms",
      content: "We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting. Continued use of the service constitutes acceptance of modified terms."
    }
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] py-16 px-6">
      {/* center the container */}
      <div className="max-w-[1050px] mx-auto">
        
        {/* header is outside of the white box */}
        <TermsHeader />

        
        <div className="bg-white border border-[#e2e8f0] rounded-[20px] p-8 md:p-16 shadow-sm">
          
          <div className="space-y-2">
            {termsData.map((item) => (
              <TermsSection 
                key={item.number}
                number={item.number}
                title={item.title}
                content={item.content}
                
                subText={item.subText} 
              />
            ))}

            {/* Section 9: Contact Information */}
            <div className="mt-12 pt-10 border-t border-[#f1f5f9]">
              <h2 className="text-[24px] font-bold text-[#1a2b4b] mb-4">9. Contact Information</h2>
              <p className="text-[17px] text-[#334155] leading-relaxed">
                For questions about these Terms & Conditions, please contact us at 
                <a 
                  href="mailto:legal@daybee.lk" 
                  className="text-[#2563eb] ml-2 font-semibold hover:underline transition-all"
                >
                  legal@daybee.lk
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;