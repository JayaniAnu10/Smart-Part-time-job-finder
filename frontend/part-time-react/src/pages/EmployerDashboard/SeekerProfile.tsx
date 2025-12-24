import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import useSeekerDetails from "@/hooks/useSeekerDetails";
import {
  Award,
  Briefcase,
  CalendarDaysIcon,
  CheckCircle,
  Mail,
  MapPin,
  Phone,
  Star,
  User,
  X,
} from "lucide-react";
import RecentJobs from "./RecentJObs";

const SeekerProfile = () => {
  const id = "7e131240-c539-4379-9f05-1ae34f4b35af";
  const { data, isLoading, isError } = useSeekerDetails(id);

  if (isLoading) <Spinner />;
  if (isError) <p>Error loading the profile</p>;

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto p-4  max-w-5xl">
        <Card className="p-10 md:px-15 mb-6">
          <div className="flex flex-col md:flex-row items-start gap-6 mb-10 mt-5">
            <Avatar className="w-32 h-32 flex self-center">
              <AvatarImage src={data?.profileDetails.profilePicture} />
              <AvatarFallback className="bg-primary/10 text-primary text-4xl">
                {data?.profileDetails.fullName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 ">
              <div className="flex items-center md:flex-row flex-col gap-3 mb-2">
                <h1 className="text-3xl font-bold text-foreground">
                  {data?.profileDetails.fullName}
                </h1>
                <Badge className="bg-primary text-[#0f1f3d]">
                  {" "}
                  {data?.profileDetails.isVerified == true
                    ? "Verified"
                    : "Not Verified"}
                </Badge>
              </div>
              <p className="text-muted-foreground mb-9">Part-Time Job Seeker</p>

              <div className="grid md:grid-cols-2 gap-4 mb-9">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="md:w-4 md:h-4 w-5 h-5 text-[#fbbd23]" />
                  <span>{data?.profileDetails.address}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="w-4 h-4 text-[#fbbd23]" />
                  <span>{data?.profileDetails.contact}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <CalendarDaysIcon className="w-4 h-4 text-[#fbbd23]" />
                  <span>Date of Birth: {data?.profileDetails.dateOfBirth}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <User className="w-4 h-4 text-[#fbbd23]" />
                  <span>{data?.profileDetails.gender}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="w-4 h-4 text-[#fbbd23]" />
                  <span>{data?.profileDetails.email}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Star className="w-4 h-4 fill-primary text-[#fbbd23]" />
                  <span>
                    {data?.profileDetails.rate.toPrecision(2)} Rating{" "}
                  </span>
                </div>
              </div>

              <div className="flex gap-3 md:flex-row flex-col">
                <Button className="bg-primary hover:bg-primary/80 text-[#0f1f3d] cursor-pointer">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Approve Application
                </Button>
                <Button
                  variant="destructive"
                  className="cursor-pointer text-white"
                >
                  <X className="w-4 h-4 mr-2" />
                  Reject Application
                </Button>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8 ">
            <Card className="p-4 border border-border hover:scale-105 transition-transform duration-300">
              <Briefcase className="w-6 h-6 text-primary mb-2" />
              <p className="text-2xl font-bold text-foreground">
                {data?.profileDetails.completedJobs}
              </p>
              <p className="text-sm text-muted-foreground">Jobs Completed</p>
            </Card>
            <Card className="p-4 border border-border hover:scale-105 transition-transform duration-300">
              <Award className="w-6 h-6 text-primary mb-2" />
              <p className="text-2xl font-bold text-foreground">3</p>
              <p className="text-sm text-muted-foreground">Badges Earned</p>
            </Card>
          </div>

          <div className="space-y-9 mb-6">
            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-3">
                About
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {data?.profileDetails.bio}
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-3">
                Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {data?.profileDetails.skills.split(",").map((skill) => (
                  <Badge key={skill} variant="secondary" className="text-sm">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
            {/*Recent jobs*/}
            <RecentJobs jobs={data?.jobDetails} />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SeekerProfile;
