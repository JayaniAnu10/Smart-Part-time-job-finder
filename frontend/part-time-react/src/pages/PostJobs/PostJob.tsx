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
import LocationPicker from "@/components/common/LocationPicker";
import SkillTag from "@/components/SkillTag";
import { Link, useNavigate } from "react-router-dom";
import useAddJob, { type JobData } from "@/hooks/useAddJob";
import { useForm, Controller } from "react-hook-form";
import useCategory from "@/hooks/useCategory";
import { useState } from "react";
import Checkbox from "@/components/Checkbox";

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
  const [benefits, setBenefits] = useState<string[]>([]);
  const [isUrgent, setIsUrgent] = useState(false);
  const id = "49fe9b1f-06d6-4c66-8acd-454a83982362";
  const { data: categories } = useCategory();

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
    getValues,
    trigger,
    watch,
  } = useForm<JobData>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      schedules: [{ startDatetime: "", endDatetime: "", requiredWorkers: 1 }],
      accommodation: "",
      latitude: 6.907340702276085,
      longitude: 79.87987518310548,
      location: "",
    },
  });

  const minSalary = watch("minSalary");

  const onSubmit = (data: JobData) => {
    const payload = {
      ...data,
      categoryId: Number(data.categoryId),
      minSalary: Number(data.minSalary),
      maxSalary: Number(data.maxSalary),
      isUrgent,
      totalVacancies: Number(data.totalVacancies),
      accommodation: benefits.join(", "),
      deadline: new Date(data.deadline).toISOString(),
      schedules: data.schedules.map((s) => ({
        ...s,
        startDatetime: new Date(s.startDatetime).toISOString(),
        endDatetime: new Date(s.endDatetime).toISOString(),
      })),
    };

    console.log(payload);
    handleAddJob.mutate(payload);
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <Card className="p-8 border">
          <h1 className="text-4xl font-bold text-[#0f1f3d] dark:text-white mb-2">
            Post a New Job
          </h1>
          <p className="text-muted-foreground mb-8">
            Fill in the details to create your job listing
          </p>

          <form className="space-y-7" onSubmit={handleSubmit(onSubmit)}>
            {/* Job Title */}
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

            {/* Category & Job Type */}
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
                      value={field.value ? String(field.value) : ""}
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories?.map((cat) => (
                          <SelectItem key={cat.id} value={String(cat.id)}>
                            {cat.category}
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
                <Controller
                  name="jobType"
                  control={control}
                  rules={{ required: "Job type is required" }}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="physical">
                          Physical/On-site
                        </SelectItem>
                        <SelectItem value="online">Online</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.jobType && (
                  <p className="text-red-500 text-sm">
                    {errors.jobType.message}
                  </p>
                )}
              </div>
            </div>

            {/* Salary */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="salary-min">Minimum Salary (LKR/day)</Label>
                <Input
                  id="salary-min"
                  type="number"
                  placeholder="2500"
                  className="mt-2"
                  {...register("minSalary", {
                    valueAsNumber: true,
                    required: "Minimum salary is required",
                    min: { value: 0, message: "Cannot be negative" },
                    onChange: () => trigger("maxSalary"),
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
                  className="mt-2"
                  {...register("maxSalary", {
                    valueAsNumber: true,
                    required: "Maximum salary is required",
                    min: { value: 0, message: "Cannot be negative" },
                    validate: (maxValue) =>
                      maxValue >= getValues("minSalary") ||
                      "Maximum must be greater than minimum",
                  })}
                />
                {errors.maxSalary && (
                  <p className="text-red-500 text-sm">
                    {errors.maxSalary.message}
                  </p>
                )}
              </div>
            </div>

            {/* Location */}
            <div className="flex flex-col gap-3">
              <Label>Job Location</Label>
              <LocationPicker
                onSelect={({ latitude, longitude, location }) => {
                  setValue("latitude", latitude, { shouldValidate: false });
                  setValue("longitude", longitude, { shouldValidate: false });
                  setValue("location", location, { shouldValidate: false });
                }}
              />
              <div className="grid grid-cols-2 gap-5 mt-5">
                <div className="flex flex-col gap-2">
                  <Label>Latitude</Label>
                  <Input
                    {...register("latitude", {
                      required: "Location is required",
                    })}
                    readOnly
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Longitude</Label>
                  <Input
                    {...register("longitude", {
                      required: "Location is required",
                    })}
                    readOnly
                  />
                </div>
                {(errors.latitude || errors.longitude || errors.location) && (
                  <p className="text-red-500 text-sm">
                    {errors.latitude?.message ||
                      errors.longitude?.message ||
                      errors.location?.message}
                  </p>
                )}
              </div>
            </div>

            {/* Description & Requirements */}
            <div>
              <Label>Job Description</Label>
              <Textarea
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
              <Label>Requirements</Label>
              <Textarea
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

            {/* Job Schedules */}
            <AddJobSchedules
              control={control}
              register={register}
              errors={errors}
              watch={watch}
              getValues={getValues}
            />

            {/* Vacancies & Deadline */}
            <div className="flex flex-row gap-6">
              <div className="flex-1">
                <Label>Number of Vacancies</Label>
                <Input
                  type="number"
                  placeholder="1"
                  className="mt-2"
                  min={1}
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
              <div className="flex-1">
                <Label>Application Deadline</Label>
                <Input
                  type="datetime-local"
                  className="mt-2"
                  {...register("deadline", {
                    required: "Deadline is required",
                    validate: (value) =>
                      new Date(value) > new Date() || "Invalid Deadline",
                    onChange: () => trigger("schedules"),
                  })}
                />
                {errors.deadline && (
                  <p className="text-red-500 text-sm">
                    {errors.deadline.message}
                  </p>
                )}
              </div>
            </div>
            {/* Benefits */}
            <div>
              <Label>Benefits (Optional)</Label>

              <div className="border border-input rounded-lg p-6 flex flex-wrap gap-4">
                {benefitOptions.map((benefit) => (
                  <SkillTag
                    label={benefit}
                    selected={benefits.includes(benefit)}
                    toggle={() => {
                      setBenefits((prev) =>
                        prev.includes(benefit)
                          ? prev.filter((b) => b !== benefit)
                          : [...prev, benefit]
                      );
                    }}
                  />
                ))}
              </div>
            </div>

            <div>
              <Checkbox
                label="Urgent Job Post"
                checked={isUrgent}
                onChange={() => setIsUrgent(!isUrgent)}
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-4">
              <Button
                type="submit"
                className="flex-1 bg-primary hover:bg-primary/80 text-[#0f1f3d]"
                disabled={handleAddJob.isPending}
              >
                {handleAddJob.isPending ? "Publishing..." : "Publish Job"}
              </Button>
              <Button
                asChild
                type="button"
                variant="outline"
                className="flex-1 text-[#0f1f3d] dark:text-white"
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
