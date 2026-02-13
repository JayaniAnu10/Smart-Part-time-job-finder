import { useState } from "react";
import { useParams } from "react-router-dom";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";

import useSeekerDetails from "@/hooks/useSeekerDetails";
import useCreateComplaint from "@/hooks/useCreateComplaint";
import useComplaintTypes from "@/hooks/useComplaintTypes";
import { useAuthStore } from "@/store/AuthStore";

import {
  CalendarDaysIcon,
  Mail,
  MapPin,
  Phone,
  Star,
  User,
  X,
  AlertCircle,
} from "lucide-react";

import RecentJobs from "./RecentJobs";

const ApplicantProfile = () => {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, isError } = useSeekerDetails(id!);
  const { data: complaintTypes, isLoading: typesLoading } = useComplaintTypes();

  const loggedUser = useAuthStore((state) => state.user);
  const { mutate, isPending: isSubmitting } = useCreateComplaint();

  const [open, setOpen] = useState(false);
  const [description, setDescription] = useState("");
  const [typeId, setTypeId] = useState<number | "">("");

  if (isLoading || typesLoading) return <Spinner />;
  if (isError || !data) return <p>Error loading the profile</p>;

  const handleSubmitComplaint = () => {
    if (!loggedUser) {
      alert("You must be logged in");
      return;
    }

    if (!typeId || !description.trim()) {
      alert("Please select complaint type and enter description");
      return;
    }

    mutate(
      {
        reporterId: loggedUser.id,
        targetId: id!,
        typeId,
        description,
      },
      {
        onSuccess: () => {
          alert("Complaint submitted successfully");
          setOpen(false);
          setDescription("");
          setTypeId("");
        },
        onError: () => {
          alert("Failed to submit complaint");
        },
      },
    );
  };

  return (
    <div className="min-h-screen bg-background py-9">
      <div className="container mx-auto p-3 max-w-5xl">
        <Card className="p-7 mb-6">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div className="flex gap-6">
              <Avatar className="w-32 h-32 ring-2 ring-primary/10">
                <AvatarImage src={data.profileDetails.profilePicture} />
                <AvatarFallback>
                  {data.profileDetails.fullName
                    .split(" ")
                    .map((n: string) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>

              <div>
                <h1 className="text-4xl font-bold">
                  {data.profileDetails.fullName}
                </h1>
                <Badge className="bg-yellow-400 text-black mt-2 hover:bg-yellow-500">
                  {data.profileDetails.isVerified ? "Verified" : "Not Verified"}
                </Badge>
              </div>
            </div>

            <button
              onClick={() => setOpen(true)}
              className="px-5 py-2.5 bg-red-50 text-red-600 border border-red-200 rounded-lg font-medium hover:bg-red-600 hover:text-white transition-all duration-200 shadow-sm"
            >
              Report Complaint
            </button>
          </div>

          {/* Details */}
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <Info icon={MapPin} text={data.profileDetails.address} />
            <Info icon={Phone} text={data.profileDetails.contact} />
            <Info
              icon={CalendarDaysIcon}
              text={data.profileDetails.dateOfBirth}
            />
            <Info icon={User} text={data.profileDetails.gender} />
            <Info icon={Mail} text={data.profileDetails.email} />
            <Info
              icon={Star}
              text={`${Number(data.profileDetails.rate).toFixed(1)} Rating`}
            />
          </div>

          <RecentJobs jobs={data.jobDetails} />
        </Card>
      </div>

      {/* Complaint Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white text-slate-900 rounded-xl w-full max-w-[450px] relative shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between p-5 border-b bg-slate-50">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-red-500" />
                <h2 className="text-lg font-semibold">Submit a Complaint</h2>
              </div>
              <button onClick={() => setOpen(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              <select
                value={typeId}
                onChange={(e) => setTypeId(Number(e.target.value))}
                className="w-full border p-2.5 rounded-lg mb-4"
              >
                <option value="">Choose a type...</option>
                {complaintTypes?.map((ct) => (
                  <option key={ct.id} value={ct.id}>
                    {ct.type}
                  </option>
                ))}
              </select>

              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={5}
                className="w-full border p-3 rounded-lg mb-5 resize-none"
                placeholder="Describe the issue..."
              />

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setOpen(false)}
                  className="px-5 py-2 text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>

                <button
                  onClick={handleSubmitComplaint}
                  disabled={isSubmitting}
                  className="px-6 py-2 bg-red-600 text-white rounded-lg disabled:opacity-50"
                >
                  {isSubmitting ? "Sending..." : "Submit Report"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplicantProfile;

const Info = ({ icon: Icon, text }: any) => (
  <div className="flex items-center gap-2 text-muted-foreground">
    <Icon className="w-4 h-4 text-yellow-500" />
    <span className="text-sm font-medium">{text}</span>
  </div>
);
