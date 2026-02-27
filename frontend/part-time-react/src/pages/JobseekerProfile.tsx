import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import ProfileTabs from "@/components/profile/ProfileTabs";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileForm from "@/components/profile/forms/JobseekerProfileForm";
import type { ProfileFormData } from "@/components/profile/forms/JobseekerProfileForm";
import ReviewsTab from "@/components/profile/ReviewsTab";
import { useAuthStore } from "@/store/AuthStore";
import useJobSeekerProfile from "@/hooks/useJobSeekerProfile";
import useUpdateJobSeekerProfile from "@/hooks/useUpdateJobSeekerProfile";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<"profile" | "reviews">("profile");
  const { user } = useAuthStore();

  // Fetch profile data
  const {
    data: profileData,
    isLoading,
    error,
  } = useJobSeekerProfile(user?.id || "");

  // Update profile mutation
  const updateProfileMutation = useUpdateJobSeekerProfile(user?.id || "");

  const [form, setForm] = useState<ProfileFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    nic: "",
    bio: "",
    skills: "",
  });

  const handleCancel = () => {
    if (!profileData) return;

    setForm({
      firstName: profileData.firstName || "",
      lastName: profileData.lastName || "",
      email: profileData.email || "",
      phone: profileData.contact || "",
      address: profileData.address || "",
      nic: profileData.nic || "",
      bio: profileData.bio || "",
      skills: profileData.skills || "",
    });
  };

  // Update form when profile data is loaded
  useEffect(() => {
    if (profileData) {
      setForm({
        firstName: profileData.firstName || "",
        lastName: profileData.lastName || "",
        email: profileData.email || "",
        phone: profileData.contact || "",
        address: profileData.address || "",
        nic: profileData.nic || "",
        bio: profileData.bio || "",
        skills: profileData.skills || "",
      });
    }
  }, [profileData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!user?.id) {
      alert("User not authenticated");
      return;
    }

    try {
      await updateProfileMutation.mutateAsync({
        firstName: form.firstName,
        lastName: form.lastName,
        contact: form.phone,
        address: form.address,
        nic: form.nic,
        bio: form.bio,
        skills: form.skills,
      });
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="relative pt-24 px-4 sm:px-8 lg:px-24 xl:px-32 pb-24 min-h-screen bg-background">
        <div className="flex items-center justify-center min-h-100">
          <div className="text-lg">Loading profile...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative pt-24 px-4 sm:px-8 lg:px-24 xl:px-32 pb-24 min-h-screen bg-background">
        <div className="flex items-center justify-center min-h-100">
          <div className="text-lg text-red-500">
            Error loading profile: {error.message}
          </div>
        </div>
      </div>
    );
  }

  const fullName =
    `${profileData?.firstName || ""} ${profileData?.lastName || ""}`.trim() ||
    "No Name";

  return (
    <div className="relative pt-13 px-4 sm:px-8 lg:px-24 xl:px-32 pb-24 min-h-screen bg-background">
      <h1 className="text-4xl font-semibold text-secondary dark:text-primary mb-6">
        My Profile
      </h1>

      <ProfileTabs active={activeTab} onChange={setActiveTab} />

      <div className="mt-6">
        {activeTab === "profile" && (
          <Card className="max-w-5xl rounded-lg p-6 md:p-8 border-none shadow-lg">
            <ProfileHeader
              name={fullName}
              role="Job Seeker"
              profilePicture={profileData?.profilePicture}
              userId={user?.id || ""}
            />

            <Separator className="my-8" />

            <ProfileForm
              data={form}
              onChange={handleChange}
              onSave={handleSave}
              onCancel={handleCancel}
              isLoading={updateProfileMutation.isPending}
            />
          </Card>
        )}

        {activeTab === "reviews" && (
          <Card className="max-w-5xl rounded-lg p-6 md:p-8 border-none shadow-lg">
            <ReviewsTab />
          </Card>
        )}
      </div>
    </div>
  );
}
