import React from 'react';

const ContactForm: React.FC = () => {
  return (
    <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm h-full">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Send us a Message</h2>
      
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input 
            type="text" 
            placeholder="John Doe"
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-amber-400 focus:border-transparent outline-none transition"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
          <input 
            type="email" 
            placeholder="john@example.com"
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-amber-400 focus:border-transparent outline-none transition"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
          <input 
            type="text" 
            placeholder="How can we help?"
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-amber-400 focus:border-transparent outline-none transition"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
          <textarea 
            rows={5} 
            placeholder="Tell us more..."
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-amber-400 focus:border-transparent outline-none transition resize-none"
          ></textarea>
        </div>

        <button className="w-full bg-[#f8bd25] hover:bg-[#e5ae21] text-gray-900 font-bold py-3 px-6 rounded-lg transition duration-200">
          Send Message
        </button>
      </form>
    </div>
  );
};

export default ContactForm;