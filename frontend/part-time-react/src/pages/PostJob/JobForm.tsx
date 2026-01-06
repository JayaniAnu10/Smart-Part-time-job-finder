import React, { useState } from 'react';

// Data structure for the form
interface JobFormData {
  jobTitle: string;
  jobCategory: string;
  minSalary: number;
  maxSalary: number;
  jobLocation: string;
  startTime: string;
  endTime: string;
  description: string;
  requirements: string;
  benefits: string;
  vacancies: number;
}

// Custom Input Field Component
interface InputProps {
  label: string;
  id: keyof JobFormData;
  placeholder: string;
  type?: 'text' | 'number' | 'time';
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  min?: number;
}

const CustomInput: React.FC<InputProps> = ({ label, id, placeholder, type = 'text', value, onChange, min }) => {
  
  const isPlaceholderStyle = 
    !value || 
    (id === 'minSalary' && value === 2500) || 
    (id === 'maxSalary' && value === 3000) ||
    (id === 'vacancies' && value === 1);
  
  return (
    <div className="flex flex-col mb-4">
      <label htmlFor={id} className="text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        type={type}
        id={id}
        name={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        min={min}
        className={`p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-150 ${
          isPlaceholderStyle ? 'text-gray-400' : 'text-gray-900'
        }`}
      />
    </div>
  );
};

// Custom Textarea Component
interface TextareaProps {
  label: string;
  id: keyof JobFormData;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  optional?: boolean;
  rows?: number;
}

const CustomTextarea: React.FC<TextareaProps> = ({ label, id, placeholder, value, onChange, optional = false, rows = 4 }) => (
  <div className="flex flex-col mb-4">
    <label htmlFor={id} className="text-sm font-medium text-gray-700 mb-1">
      {label} {optional && <span className="text-xs font-normal text-gray-500">(Optional)</span>}
    </label>
    <textarea
      id={id}
      name={id}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      rows={rows}
      className={`p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-150 resize-y ${
        !value ? 'text-gray-400' : 'text-gray-900'
      }`}
    />
  </div>
);

const JobCategoryDropdown: React.FC<InputProps> = ({ label, id, value, onChange }) => {
  const categories = ["Logistics & Delivery", "Retail & Sales", "Hospitality"];
  
  return (
    <div className="flex flex-col mb-4">
      <label htmlFor={id} className="text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <select
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        className={`p-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-150 appearance-none ${
          !value ? 'text-gray-400' : 'text-gray-900'
        }`}
      >
        <option value="" disabled>
          Select category
        </option>
        {categories.map((category) => (
          <option key={category} value={category} className="text-gray-900">
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

// Main Component
const JobForm: React.FC = () => {
  const [formData, setFormData] = useState<JobFormData>({
    jobTitle: '',
    jobCategory: '',
    minSalary: 2500,
    maxSalary: 3000,
    jobLocation: '',
    startTime: '',
    endTime: '',
    description: '',
    requirements: '',
    benefits: '',
    vacancies: 1,
  });

  const [activeButton, setActiveButton] = useState<string>('Publish');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const newValue = (type === 'number' || ['vacancies', 'minSalary', 'maxSalary'].includes(name))
      ? parseInt(value) || 0
      : value;

    setFormData(prev => ({ ...prev, [name]: newValue }));
  };

  const handleSalaryChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const numValue = Math.max(0, parseInt(value) || 0);
    setFormData(prev => ({ ...prev, [name]: numValue }));
  };

  const handleSubmit = (action: string) => {
    console.log(`Action: ${action}`, formData);
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 flex items-center justify-center p-4 py-12">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-4xl mx-auto">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-3 text-center md:text-left">
          Post a New Job
        </h1>
        
        <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
          <CustomInput label="Job Title" id="jobTitle" placeholder="e.g. Delivery Driver" value={formData.jobTitle} onChange={handleChange} />
          <JobCategoryDropdown label="Job Category" id="jobCategory" value={formData.jobCategory} onChange={handleChange} placeholder="Select category" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CustomInput label="Minimum Salary (LKR/day)" id="minSalary" type="number" placeholder="2500" value={formData.minSalary} onChange={handleSalaryChange} min={0} />
            <CustomInput label="Maximum Salary (LKR/day)" id="maxSalary" type="number" placeholder="3000" value={formData.maxSalary} onChange={handleSalaryChange} min={formData.minSalary} />
          </div>

          <CustomInput label="Job Location" id="jobLocation" placeholder="Enter location" value={formData.jobLocation} onChange={handleChange} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CustomInput label="Start Time" id="startTime" type="time" placeholder="--" value={formData.startTime} onChange={handleChange} />
            <CustomInput label="End Time" id="endTime" type="time" placeholder="--" value={formData.endTime} onChange={handleChange} />
          </div>

          <CustomTextarea label="Job Description" id="description" placeholder="Enter job description..." value={formData.description} onChange={handleChange} rows={5} />
          <CustomTextarea label="Requirements" id="requirements" placeholder="Enter requirements..." value={formData.requirements} onChange={handleChange} rows={5} />
          <CustomTextarea label="Benefits" id="benefits" placeholder="Enter benefits (optional)..." value={formData.benefits} onChange={handleChange} optional rows={4} />

          <CustomInput label="Number of vacancies" id="vacancies" type="number" placeholder="1" value={formData.vacancies} onChange={handleSalaryChange} min={1} />

          <div className="flex justify-end pt-4 space-x-4">
            <button
              type="button"
              onClick={() => {
                setActiveButton('Publish');
                handleSubmit('Publish');
              }}
              className={`px-6 py-2 font-medium rounded-lg transition duration-150 ${
                activeButton === 'Publish'
                  ? 'bg-yellow-400 text-gray-900 shadow-md'
                  : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100'
              }`}
            >
              Publish Job
            </button>
            
            <button
              type="button"
              onClick={() => {
                setActiveButton('Cancel');
                handleSubmit('Cancel');
              }}
              className={`px-6 py-2 font-medium rounded-lg transition duration-150 ${
                activeButton === 'Cancel' 
                  ? 'bg-yellow-400 text-gray-900 shadow-md'
                  : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100'
              }`}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobForm;