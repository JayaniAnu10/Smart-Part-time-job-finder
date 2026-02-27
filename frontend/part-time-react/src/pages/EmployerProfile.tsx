import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import ProfileTabs from "@/components/profile/ProfileTabs";
import ProfileHeader from "@/components/profile/ProfileHeader";
import EmployerProfileForm from "@/components/profile/forms/EmployerProfileForm";
import type { EmployerProfileFormData } from "@/components/profile/forms/EmployerProfileForm";
import { useAuthStore } from "@/store/AuthStore";
import useEmployerProfile from "@/hooks/useEmployerProfile";
import useUpdateEmployerProfile from "@/hooks/useUpdateEmployerProfile";
import EmployerReviewsTab from "@/components/profile/EmployerReviewsTab";

export default function EmployerProfilePage() {
  const [activeTab, setActiveTab] = useState<"profile" | "reviews">("profile");
  const { user } = useAuthStore();

  // Fetch profile data
  const {
    data: profileData,
    isLoading,
    error,
  } = useEmployerProfile(user?.id || "");

  // Update profile mutation
  const updateProfileMutation = useUpdateEmployerProfile(user?.id || "");

  const [form, setForm] = useState<EmployerProfileFormData>({
    companyName: "",
    registrationId: "",
    contactPerson: "",
    phone: "",
    email: "",
    contact: "",
    address: "",
    industry: "",
    website: "",
    description: "",
  });

  // Update form when profile data is loaded
  useEffect(() => {
    if (profileData) {
      setForm({
        companyName: profileData.companyName || "",
        registrationId: profileData.registrationId || "",
        contactPerson: profileData.contactPersonName || "",
        phone: profileData.contactPersonPhone || "",
        email: profileData.email || "",
        contact: profileData.contact || "",
        address: profileData.companyAddress || "",
        industry: profileData.industry || "",
        website: profileData.website || "",
        description: profileData.description || "",
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
        companyName: form.companyName,
        registrationId: form.registrationId,
        contactPersonName: form.contactPerson,
        contactPersonPhone: form.phone,
        contact: form.contact,
        companyAddress: form.address,
        industry: form.industry,
        website: form.website,
        description: form.description,
      });
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleCancel = () => {
    if (!profileData) return;
    setForm({
      companyName: profileData.companyName || "",
      registrationId: profileData.registrationId || "",
      contactPerson: profileData.contactPersonName || "",
      phone: profileData.contactPersonPhone || "",
      email: profileData.email || "",
      contact: profileData.contact || "",
      address: profileData.companyAddress || "",
      industry: profileData.industry || "",
      website: profileData.website || "",
      description: profileData.description || "",
    });
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

  const companyName = profileData?.companyName || "Company Name";

  return (
    <div className="relative pt-13 px-4 sm:px-8 lg:px-24 xl:px-32 pb-24 min-h-screen bg-background">
      <h1 className="text-4xl font-semibold text-secondary dark:text-primary mb-6">
        Employer Profile
      </h1>

      <ProfileTabs active={activeTab} onChange={setActiveTab} />

      <div className="mt-6">
        {activeTab === "profile" && (
          <Card className="max-w-5xl rounded-lg p-6 md:p-8 border-none shadow-lg">
            <ProfileHeader
              name={companyName}
              role="Employer"
              profilePicture={profileData?.logo}
              userId={user?.id || ""}
              isEmployer={true}
            />

            <Separator className="my-8" />

            <EmployerProfileForm
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
            <EmployerReviewsTab />
          </Card>
        )}
      </div>
    </div>
  );
}
