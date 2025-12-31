import React from 'react';

interface TermsSectionProps {
  number: number;
  title: string;
  content: string | string[];
  subText?: string;
}

const TermsSection: React.FC<TermsSectionProps> = ({ number, title, content, subText }) => {
  return (
    <div className="mb-10">
      <h2 className="text-[22px] font-bold text-[#1a2b4b] mb-4">
        {number}. {title}
      </h2>
      
      {subText && (
        <p className="text-[16.5px] text-[#334155] mb-5 leading-[1.7]">
          {subText}
        </p>
      )}

      {Array.isArray(content) ? (
        <ul className="space-y-4 ml-2">
          {content.map((item, index) => (
            <li key={index} className="flex items-start text-[16.5px] text-[#334155]">
              <span className="mr-4 mt-[10px] h-2 w-2 rounded-full bg-[#94a3b8] flex-shrink-0" />
              <span className="leading-[1.6]">{item}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-[16.5px] text-[#334155] leading-[1.7] text-justify">
          {content}
        </p>
      )}
    </div>
  );
};

export default TermsSection;