import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import ProfileTabs from "@/components/profile/ProfileTabs";
import ProfileHeader from "@/components/profile/ProfileHeader";
import EmployerProfileForm from "@/components/profile/forms/EmployerProfileForm";
import type { EmployerProfileFormData } from "@/components/profile/forms/EmployerProfileForm";
import ReviewsTab from "@/components/profile/ReviewsTab";
import NavBar from "@/components/navBar/NavBar";

export default function EmployerProfilePage() {
  const [activeTab, setActiveTab] = useState<"profile" | "reviews">("profile");

  const [form, setForm] = useState<EmployerProfileFormData>({
    companyName: "",
    registrationId: "",
    contactPerson: "",
    phone: "",
    address: "",
    industry: "",
    website: "",
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    console.log("Employer Profile Saved:", form);
  };

  return (
    <div className="relative pt-24 px-4 sm:px-8 lg:px-24 xl:px-32 pb-24 min-h-screen bg-background">
      <NavBar />

      <h1 className="text-4xl font-semibold text-secondary dark:text-primary mb-6">
        Employer Profile
      </h1>

      <ProfileTabs active={activeTab} onChange={setActiveTab} />

      <div className="mt-6">
        {activeTab === "profile" && (
          <Card className="max-w-5xl rounded-lg p-6 md:p-8 border-none shadow-lg">
            <ProfileHeader name="Company Name" role="Employer" />

            <Separator className="my-8" />

            <EmployerProfileForm
              data={form}
              onChange={handleChange}
              onSave={handleSave}
            />
          </Card>
        )}

        {activeTab === "reviews" && (
          <Card className="max-w-5xl p-8 text-muted-foreground">
            <ReviewsTab />
          </Card>
        )}
      </div>
    </div>
  );
}
