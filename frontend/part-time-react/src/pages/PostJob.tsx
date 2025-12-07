import React,{useState} from 'react';

//Data structure for the form
interface JobFormData{
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
  id: keyof JobFormData; // Use keys of JobFormData for type safety
  placeholder: string;
  type?: 'text' | 'number' | 'time';
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  min?: number; // For number inputs
}

const CustomInput: React.FC<InputProps> = ({ label, id, placeholder, type = 'text', value, onChange, min }) => (
  <div className="flex flex-col mb-4">
    <label htmlFor={id} className="text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <input
      type={type}
      id={id}
      name={id}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      min={min}
      className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-150"
    />
  </div>
);

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
      className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-150 resize-y"
      // resize-y allows vertical resizing
    />
  </div>
);

// Dropdown Component for Job Category
const JobCategoryDropdown: React.FC<InputProps> = ({ label, id, value, onChange }) => {
  const categories = ["Logistics & Delievery", "Retail & Sales", "Hospitality"];
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
        className="p-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-150 appearance-none"
      >
        <option value="" disabled>Select category</option>
        {categories.map(category => (
          <option key={category} value={category}>{category}</option>
        ))}
      </select>
    </div>
  );
};


const App: React.FC = () => {
  const [formData, setFormData] = useState<JobFormData>({
    jobTitle: '',
    jobCategory: '',
    minSalary: 2500, // Default value set to 2500
    maxSalary: 3000, // Default value set to 3000
    jobLocation: '',
    startTime: '',
    endTime: '',
    description: '',
    requirements: '',
    benefits: '',
    vacancies: 1, // Default value set to 1
  });

  // Universal change handler for all form fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    // Convert string to number for number inputs
    const newValue = (type === 'number' || name === 'vacancies' || name === 'minSalary' || name === 'maxSalary')
      ? parseInt(value)
      : value;

    setFormData(prevData => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  const handleSalaryChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    // Ensure value is a positive number, default to 0 if invalid
    const numValue = Math.max(0, parseInt(value) || 0);

    setFormData(prevData => ({
      ...prevData,
      [name]: numValue,
    }));
  };


  const handleSubmit = (action: 'Publish' | 'Save Draft') => {
    console.log(`Action: ${action}`);
    console.log('Form Data:', formData);
    // In a real app, you would send this data to a backend API here
    alert(`Job ${action}ed! Check console for data.`);
  };


  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-4xl">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-3">
          Post a New Job
        </h1>
        <p className="text-sm text-gray-500 mb-6">
          Fill in the details to create your job listing
        </p>

        <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
          {/* Job Title */}
          <CustomInput
            label="Job Title"
            id="jobTitle"
            placeholder="e.g. Delivery Driver"
            value={formData.jobTitle}
            onChange={handleChange}
          />

          
          {/* Job Category (Dropdown) */}
          <JobCategoryDropdown
            label="Job Category"
            id="jobCategory"
            value={formData.jobCategory}
            onChange={handleChange}
            placeholder="Select category"
          />

          {/* Salary Range */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CustomInput
              label="Minimum Salary (LKR/day)"
              id="minSalary"
              type="number"
              placeholder="2500"
              value={formData.minSalary}
              onChange={handleSalaryChange}
              min={0}
            />
            <CustomInput
              label="Maximum Salary (LKR/day)"
              id="maxSalary"
              type="number"
              placeholder="3000"
              value={formData.maxSalary}
              onChange={handleSalaryChange}
              min={formData.minSalary} // Max should be greater than Min
            />
          </div>

          {/* Job Location */}
          <CustomInput
            label="Job Location"
            id="jobLocation"
            placeholder=""
            value={formData.jobLocation}
            onChange={handleChange}
          />

          {/* Start and End Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CustomInput
              label="Start Time"
              id="startTime"
              type="time"
              placeholder="--"
              value={formData.startTime}
              onChange={handleChange}
            />
            <CustomInput
              label="End Time"
              id="endTime"
              type="time"
              placeholder="--"
              value={formData.endTime}
              onChange={handleChange}
            />
          </div>


          {/* Job Description (Resizable Textarea) */}
          <CustomTextarea
            label="Job Description"
            id="description"
            placeholder=""
            value={formData.description}
            onChange={handleChange}
            rows={5} // Increased default rows for better visibility
          />

          {/* Requirements (Resizable Textarea) */}
          <CustomTextarea
            label="Requirements"
            id="requirements"
            placeholder=""
            value={formData.requirements}
            onChange={handleChange}
            rows={5}
          />

          {/* Benefits (Optional, Resizable Textarea) */}
          <CustomTextarea
            label="Benefits"
            id="benefits"
            placeholder=""
            value={formData.benefits}
            onChange={handleChange}
            optional
            rows={4}
          />

          {/* Number of Vacancies */}
          <CustomInput
            label="Number of vacancies"
            id="vacancies"
            type="number"
            placeholder="1"
            value={formData.vacancies}
            onChange={handleSalaryChange} // Reusing handleSalaryChange to ensure positive number
            min={1}
          />

          {/* Action Buttons */}
          <div className="flex justify-end pt-4 space-x-4">
            {/* Publish Button */}
            <button
              type="button"
              onClick={() => handleSubmit('Publish')}
              className="px-6 py-2 border border-transparent text-sm font-medium rounded-lg text-gray-900 bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition duration-150"
            >
              Publish Job
            </button>
            {/* Cancel Button */}
            <button
              type="button"
              onClick={() => handleSubmit('Cancel')}
              className="px-6 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white 
               hover:bg-yellow-500 hover:border-yellow-400 
               focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 
               transition duration-150"
            >
              Cancel  
            </button>
        </div>
        </form>
      </div>
    </div>
  );
};

export default App;
