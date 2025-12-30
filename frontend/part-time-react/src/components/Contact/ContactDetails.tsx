import React, { ReactNode } from 'react';
import { Mail, Phone, MapPin, Clock, LucideIcon } from 'lucide-react';

interface DetailItemProps {
  icon: LucideIcon;
  title: string;
  children: ReactNode;
}

const DetailItem: React.FC<DetailItemProps> = ({ icon: Icon, title, children }) => (
  <div className="flex gap-4 mb-6">
    <div className="bg-amber-50 p-3 rounded-lg h-fit">
      <Icon className="w-5 h-5 text-amber-500" />
    </div>
    <div>
      <h3 className="font-bold text-gray-800">{title}</h3>
      <div className="text-gray-600 text-sm leading-relaxed">{children}</div>
    </div>
  </div>
);

const ContactDetails: React.FC = () => {
  return (
    <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm h-full">
      <h2 className="text-2xl font-bold text-gray-800 mb-8">Contact Information</h2>
      
      <DetailItem icon={Mail} title="Email">
        <p>support@daybee.lk</p>
        <p>info@daybee.lk</p>
      </DetailItem>

      <DetailItem icon={Phone} title="Phone">
        <p>+94 11 234 5678</p>
        <p>+94 77 123 4567</p>
      </DetailItem>

      <DetailItem icon={MapPin} title="Office">
        <p>123 Business Tower,</p>
        <p>Colombo 03, Sri Lanka</p>
      </DetailItem>

      <DetailItem icon={Clock} title="Business Hours">
        <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
        <p>Saturday: 9:00 AM - 1:00 PM</p>
        <p>Sunday: Closed</p>
      </DetailItem>
    </div>
  );
};

export default ContactDetails;