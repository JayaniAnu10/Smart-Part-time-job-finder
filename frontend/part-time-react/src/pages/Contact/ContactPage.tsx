import React from "react";
import ContactForm from "../../components/Contact/ContactForm";
import ContactDetails from "../../components/Contact/ContactDetails";
import HelpCard from "../../components/Contact/HelpCard";

const ContactPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8 mt-10">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight dark:">
          Get in Touch
        </h1>
        <p className="text-gray-600">
          We'd love to hear from you. Send us a message and we'll respond as
          soon as possible.
        </p>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1  gap-8 items-stretch">
          <div className="flex flex-col h-full gap-6">
            <ContactDetails />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
