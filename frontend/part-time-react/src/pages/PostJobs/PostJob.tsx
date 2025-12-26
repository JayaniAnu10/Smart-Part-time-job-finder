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
import { Link, useNavigate } from "react-router-dom";
import useAddJob, { type JobData } from "@/hooks/useAddJob";
import { useForm } from "react-hook-form";
import useCategory from "@/hooks/useCategory";
import { Controller } from "react-hook-form";

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
  const navigate = useNavigate();
  const [location, setLocation] = useState("");
  const [accommodation, setAccommodation] = useState<string[]>([]);
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);

  const id = "";

  const { data } = useCategory();

  const handleAddJob = useAddJob(id, () => {
    reset();
    navigate("/");
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setValue,
  } = useForm<JobData>();

  const onSubmit = (data: JobData) => {
    handleAddJob.mutate(data);
  };

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

          <form className="space-y-7" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <Label htmlFor="job-title">Job Title</Label>
              <Input
                id="job-title"
                placeholder="e.g. Delivery Driver"
                className="mt-2"
                {...register("title", { required: "Job title is required" })}
              />
              {errors.title && (
                <p className="text-red-500 text-sm">{errors.title.message}</p>
              )}
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="category">Job Category</Label>
                <Controller
                  name="categoryId"
                  control={control}
                  rules={{ required: "Job category is required" }}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      value={String(field.value)}
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {data?.map((category) => (
                          <SelectItem
                            key={category.id}
                            value={String(category.id)}
                          >
                            {category.category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />

                {errors.categoryId && (
                  <p className="text-red-500 text-sm">
                    {errors.categoryId.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="type">Job Type</Label>
                <Select
                  {...register("jobType", { required: "Job type is required" })}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="physical">Physical/On-site</SelectItem>
                    <SelectItem value="online">Online</SelectItem>
                  </SelectContent>
                </Select>
                {errors.jobType && (
                  <p className="text-red-500 text-sm">
                    {errors.jobType.message}
                  </p>
                )}
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
                  {...register("minSalary", {
                    required: "Minimum salary is required",
                    min: { value: 0, message: "Cannot be negative" },
                  })}
                />
                {errors.minSalary && (
                  <p className="text-red-500 text-sm">
                    {errors.minSalary.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="salary-max">Maximum Salary (LKR/day)</Label>
                <Input
                  id="salary-max"
                  type="number"
                  placeholder="3000"
                  className="mt-2 "
                  min={0}
                  {...register("maxSalary", {
                    required: "Maximum salary is required",
                    min: { value: 0, message: "Cannot be negative" },
                  })}
                />
                {errors.maxSalary && (
                  <p className="text-red-500 text-sm">
                    {errors.maxSalary.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <Label className="">Job Location</Label>

              <LocationPicker
                onSelect={({ latitude, longitude, label }) => {
                  setLocation(label);
                  setLatitude(latitude);
                  setLongitude(longitude);

                  setValue("location", label, { shouldValidate: true });
                  setValue("latitude", latitude, { shouldValidate: true });
                  setValue("longitude", longitude, { shouldValidate: true });
                }}
              />

              <div className="grid grid-cols-2 gap-5 mt-5">
                <div className="flex flex-col gap-2">
                  <Label>Latitude</Label>
                  <Input
                    type="hidden"
                    value={latitude ?? ""}
                    readOnly
                    {...register("latitude", {
                      required: "Location is required",
                    })}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Longitude</Label>
                  <Input
                    type="hidden"
                    value={longitude ?? ""}
                    readOnly
                    {...register("longitude", {
                      required: "Location is required",
                    })}
                  />
                </div>
                {errors.location && (
                  <p className="text-red-500 text-sm">
                    {errors.location.message}
                  </p>
                )}
              </div>
            </div>
            <div>
              <Label htmlFor="description">Job Description</Label>
              <Textarea
                id="description"
                placeholder="Describe the job responsibilities and information..."
                className="mt-2 min-h-37.5 resize-none"
                {...register("description", {
                  required: "Description is required",
                })}
              />
              {errors.description && (
                <p className="text-red-500 text-sm">
                  {errors.description.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="requirements">Requirements</Label>
              <Textarea
                id="requirements"
                placeholder="List the required qualifications and skills..."
                className="mt-2 min-h-30 resize-none"
                {...register("requirements", {
                  required: "Requirements are required",
                })}
              />
              {errors.requirements && (
                <p className="text-red-500 text-sm">
                  {errors.requirements.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="benefits">Benefits (Optional)</Label>
              <div className="border border-input rounded-lg p-6 flex flex-wrap gap-4 ">
                {benefitOptions.map((benefit) => (
                  <SkillTag
                    key={benefit}
                    label={benefit}
                    selected={accommodation.includes(benefit)}
                    toggle={() => {
                      if (accommodation.includes(benefit)) {
                        setAccommodation(
                          accommodation.filter((b) => b !== benefit)
                        );
                      } else {
                        setAccommodation([...accommodation, benefit]);
                      }

                      // keep RHF in sync
                      setValue(
                        "accommodation",
                        accommodation.includes(benefit)
                          ? accommodation.filter((b) => b !== benefit)
                          : [...accommodation, benefit],
                        { shouldValidate: true }
                      );
                    }}
                  />
                ))}
              </div>

              {/* Hidden input so RHF knows this field exists */}
              <input type="hidden" {...register("accommodation")} />
            </div>

            <AddJobSchedules control={control} register={register} />
            <div>
              <Label htmlFor="vacancies">Number of Vacancies</Label>
              <Input
                id="vacancies"
                type=""
                placeholder="1"
                className="mt-2"
                min={0}
                {...register("totalVacancies", {
                  required: "Number of vacancies is required",
                  min: { value: 1, message: "At least 1 vacancy" },
                })}
              />
              {errors.totalVacancies && (
                <p className="text-red-500 text-sm">
                  {errors.totalVacancies.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="deadline">Application Deadline</Label>
              <Input
                id="deadline"
                type="datetime-local"
                className="mt-2"
                {...register("deadline", {
                  required: "Deadline is required",
                  validate: (value) => {
                    const selected = new Date(value);
                    const now = new Date();
                    return selected > now || "Invalid Deadline";
                  },
                })}
              />
              {errors.deadline && (
                <p className="text-red-500 text-sm">
                  {errors.deadline.message}
                </p>
              )}
            </div>
            <div className="flex gap-4 pt-4">
              <Button
                type="submit"
                className="flex-1 bg-primary hover:bg-primary/80 text-[#0f1f3d] cursor-pointer"
              >
                Publish Job
              </Button>

              <Button
                asChild
                type="button"
                variant="outline"
                className="flex-1 text-[#0f1f3d] dark:text-white cursor-pointer"
              >
                <Link to={"/"}>Cancel</Link>
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default PostJob;
