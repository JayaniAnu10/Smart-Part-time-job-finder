import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AddJobSchedules from "./AddJobSchedules";
import { useState } from "react";
import LocationPicker from "@/components/common/LocationPicker";
import SkillTag from "@/components/SkillTag";

const benefitOptions = [
  "Transport",
  "Housing/Accommodation",
  "Lunch",
  "Dinner",
  "Breakfast",
  "Snacks",
  "Overtime pay",
  "Health",
  "Training",
  "Uniform",
  "Team work",
  "Individual work",
];

const PostJob = () => {
  const [location, setLocation] = useState("");
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <Card className="p-8 border">
          <h1 className="text-4xl font-bold text-[#0f1f3d]  dark:text-white mb-2">
            Post a New Job
          </h1>
          <p className="text-muted-foreground mb-8">
            Fill in the details to create your job listing
          </p>

          <form className="space-y-7">
            <div>
              <Label htmlFor="job-title">Job Title</Label>
              <Input
                id="job-title"
                placeholder="e.g. Delivery Driver"
                className="mt-2"
              />
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="category">Job Category</Label>
                <Select>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="logistics">
                      Logistics & Delivery
                    </SelectItem>
                    <SelectItem value="retail">Retail & Sales</SelectItem>
                    <SelectItem value="hospitality">Hospitality</SelectItem>
                    <SelectItem value="cleaning">
                      Cleaning & Maintenance
                    </SelectItem>
                    <SelectItem value="construction">Construction</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="type">Job Type</Label>
                <Select>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="physical">Physical/On-site</SelectItem>
                    <SelectItem value="online">Online</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="salary-min">Minimum Salary (LKR/day)</Label>
                <Input
                  id="salary-min"
                  type="number"
                  placeholder="2500"
                  className="mt-2"
                  min={0}
                />
              </div>
              <div>
                <Label htmlFor="salary-max">Maximum Salary (LKR/day)</Label>
                <Input
                  id="salary-max"
                  type="number"
                  placeholder="3000"
                  className="mt-2 "
                  min={0}
                />
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <Label className="">Job Location</Label>

              <LocationPicker
                onSelect={({ latitude, longitude, label }) => {
                  setLocation(label);
                  setLatitude(latitude);
                  setLongitude(longitude);
                }}
              />

              <div className="grid grid-cols-2 gap-5 mt-5">
                <div className="flex flex-col gap-2">
                  <Label>Latitude</Label>
                  <Input value={latitude ?? ""} readOnly />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Longitude</Label>
                  <Input value={longitude ?? ""} readOnly />
                </div>
              </div>
            </div>
            <div>
              <Label htmlFor="description">Job Description</Label>
              <Textarea
                id="description"
                placeholder="Describe the job responsibilities and information..."
                className="mt-2 min-h-37.5 resize-none"
              />
            </div>
            <div>
              <Label htmlFor="requirements">Requirements</Label>
              <Textarea
                id="requirements"
                placeholder="List the required qualifications and skills..."
                className="mt-2 min-h-30 resize-none"
              />
            </div>
            <div>
              <Label htmlFor="benefits">Benefits (Optional)</Label>
              {/*<div className="border border-[#A5A8AD] rounded-lg p-4 flex flex-wrap gap-1 bg-[#FAFAFA]">
                {benefitOptions.map((benefit) => (
                  <SkillTag
                    key={benefit}
                    label={benefit}
                    selected={data.skills.includes(benefit)}
                    toggle={() => {
                      if (data.skills.includes(benefit)) {
                        // remove skill
                        setData({
                          skills: data.skills.filter((s) => s !== benefit),
                        });
                      } else {
                        // add skill
                        setData({ skills: [...data.skills, skill] });
                      }
                    }}
                  />
                ))}
              </div>*/}
            </div>
            <div>
              <Label htmlFor="vacancies">Number of Vacancies</Label>
              <Input
                id="vacancies"
                type="number"
                placeholder="1"
                className="mt-2"
                min={0}
              />
            </div>
            <AddJobSchedules />
            <div className="flex gap-4 pt-4">
              <Button
                type="submit"
                className="flex-1 bg-primary hover:bg-primary/80 text-[#0f1f3d] cursor-pointer"
              >
                Publish Job
              </Button>
              <Button
                type="button"
                variant="outline"
                className="flex-1 text-[#0f1f3d] dark:text-white cursor-pointer"
              >
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default PostJob;
