import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

<<<<<<< HEAD
import ProfileTabs from "@/components/profile/ProfileTabs";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileForm from "@/components/profile/forms/JobseekerProfileForm";
import type { ProfileFormData } from "@/components/profile/forms/JobseekerProfileForm";
import ReviewsTab from "@/components/profile/ReviewsTab";
=======
import ProfileTabs from "@/components/jobseekerProfile/ProfileTabs";
import ProfileHeader from "@/components/jobseekerProfile/ProfileHeader";
import ProfileForm from "@/components/jobseekerProfile/ProfileForm";
import type { ProfileFormData } from "@/components/jobseekerProfile/ProfileForm";
import ReviewsTab from "@/components/jobseekerProfile/ReviewsTab";
>>>>>>> 17b170942e0c1ddcbfcece02ae3ad3709c1da1f2
import NavBar from "@/components/navBar/NavBar";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<"profile" | "reviews">("profile");

  const [form, setForm] = useState<ProfileFormData>({
    firstName: "",
    lastName: "",
    email: "user@email.com",
    phone: "",
    address: "",
    nic: "",
    bio: "",
    skills: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    console.log("Profile Saved:", form);
  };

  return (
    <div className="relative pt-24 px-4 sm:px-8 lg:px-24 xl:px-32 pb-24 min-h-screen bg-background">
<<<<<<< HEAD
       <NavBar />
=======
      <NavBar />
>>>>>>> 17b170942e0c1ddcbfcece02ae3ad3709c1da1f2
      <h1 className="text-4xl font-semibold text-secondary dark:text-primary mb-6">
        My Profile
      </h1>
 
      <ProfileTabs active={activeTab} onChange={setActiveTab} />

      <div className="mt-6">
        {activeTab === "profile" && (
          <Card className="max-w-5xl rounded-lg p-6 md:p-8 border-none shadow-lg">
            <ProfileHeader name="No Name" role="Job Seeker" />

            <Separator className="my-8" />

            <ProfileForm
              data={form}
              onChange={handleChange}
              onSave={handleSave}
            />
          </Card>
        )}

        {activeTab === "reviews" && (
<<<<<<< HEAD
          <Card className="max-w-5xl p-8 text-muted-foreground">
=======
          <Card className="max-w-5xl rounded-lg p-6 md:p-8 border-none shadow-lg">
>>>>>>> 17b170942e0c1ddcbfcece02ae3ad3709c1da1f2
            <ReviewsTab />
          </Card>
        )}
      </div>
    </div>
  );
}

