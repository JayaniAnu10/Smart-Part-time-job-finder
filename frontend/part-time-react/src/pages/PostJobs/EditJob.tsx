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
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import useCategory from "@/hooks/useCategory";
import { useEffect, useState, useRef } from "react";
import { Switch } from "@/components/ui/switch";
import { useAuthStore } from "@/store/AuthStore";
import useJobById from "@/hooks/useJobById";
import useUpdateJob from "@/hooks/useUpdateJob";
import { Spinner } from "@/components/ui/spinner";
import type { JobData } from "@/hooks/useAddJob";

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
  "Daily Payment",
];

const requiredGenderOptions = ["Male", "Female", "Male & Female both"];

const EditJob = () => {
  const user = useAuthStore((s) => s.user);
  const navigate = useNavigate();
  const { jobId } = useParams<{ jobId: string }>();
  const [benefits, setBenefits] = useState<string[]>([]);
  const [isUrgent, setIsUrgent] = useState(false);
  const { data: categories } = useCategory();
  const isDataInitialized = useRef(false);

  // Fetch existing job data
  const { data: jobData, isLoading: loadingJob, isError } = useJobById(jobId!);

  // Update mutation
  const updateMutation = useUpdateJob(jobId!);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    getValues,
    reset,
    trigger,
    watch,
  } = useForm<JobData>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      title: "",
      categoryId: 0,
      jobType: "",
      minSalary: 0,
      maxSalary: 0,
      location: "",
      latitude: 6.907340702276085,
      longitude: 79.87987518310548,
      description: "",
      requirements: "",
      requiredGender: "",
      deadline: "",
      schedules: [{ startDatetime: "", endDatetime: "", requiredWorkers: 1 }],
      accommodation: "",
    },
  });

  const genderMap: Record<string, string> = {
    male: "Male",
    female: "Female",
    both: "Male & Female both",
    "male & female both": "Male & Female both",
  };

  const formatForDateTimeLocal = (dateString: string) => {
    const date = new Date(dateString);
    const tzOffset = date.getTimezoneOffset() * 60000;
    return new Date(date.getTime() - tzOffset).toISOString().slice(0, 16);
  };

  useEffect(() => {
    if (!jobData || !categories || isDataInitialized.current) return;

    const formData = {
      title: jobData.title,
      categoryId: jobData.categoryId,
      jobType: jobData.jobType.toLowerCase(),
      minSalary: jobData.minSalary,
      maxSalary: jobData.maxSalary,
      location: jobData.location,
      latitude: jobData.latitude,
      longitude: jobData.longitude,
      description: jobData.description,
      requirements: jobData.requirements,
      requiredGender:
        genderMap[jobData.requiredGender.toLowerCase()] ??
        jobData.requiredGender,
      deadline: formatForDateTimeLocal(jobData.deadline),
      schedules:
        jobData.jobSchedules?.map((s) => ({
          startDatetime: formatForDateTimeLocal(s.startDatetime),
          endDatetime: formatForDateTimeLocal(s.endDatetime),
          requiredWorkers: s.requiredWorkers,
        })) ?? [],
    };

    console.log("Setting form data:", formData);
    reset(formData);

    setBenefits(jobData.accommodation ? jobData.accommodation.split(", ") : []);
    setIsUrgent(jobData.isUrgent ?? false);

    isDataInitialized.current = true;
  }, [jobData, categories]);

  const onSubmit = (data: JobData) => {
    const payload = {
      ...data,
      categoryId: Number(data.categoryId),
      minSalary: Number(data.minSalary),
      maxSalary: Number(data.maxSalary),
      isUrgent,
      accommodation: benefits.join(", "),
      deadline: new Date(data.deadline).toISOString(),
      schedules: data.schedules.map((s) => ({
        ...s,
        startDatetime: new Date(s.startDatetime).toISOString(),
        endDatetime: new Date(s.endDatetime).toISOString(),
      })),
    };

    updateMutation.mutate(payload, {
      onSuccess: () => {
        navigate("/empDashboard");
      },
    });
  };

  if (loadingJob || !categories) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-xl">Error loading job data</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background md:py-12 py-2 mt-9">
      <div className="container md:mx-auto md:px-4 max-w-4xl px-2">
        <Card className="md:p-8 border dark:border-0 p-5">
          <h1 className="text-4xl font-bold text-[#0f1f3d] dark:text-white mb-2">
            Edit <span className="dark:text-yellow-400">Job</span>
          </h1>
          <p className="text-muted-foreground mb-8">
            Update your job listing details
          </p>

          <form
            key={jobData?.id}
            className="space-y-7"
            onSubmit={handleSubmit(onSubmit)}
          >
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
                      onValueChange={(value) => field.onChange(Number(value))}
                      value={field.value ? String(field.value) : ""}
                      key={`category-${field.value || "new"}`}
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
                    <Select
                      value={field.value || ""}
                      onValueChange={field.onChange}
                      key={`jobtype-${field.value || "new"}`}
                    >
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
                  <Input {...register("longitude")} readOnly />
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <Label htmlFor="description">Job Description</Label>
              <Textarea
                id="description"
                rows={5}
                placeholder="Describe the role and responsibilities..."
                className="mt-2"
                {...register("description", {
                  required: "Job description is required",
                })}
              />
              {errors.description && (
                <p className="text-red-500 text-sm">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Requirements */}
            <div>
              <Label htmlFor="requirements">Requirements & Skills</Label>
              <Textarea
                id="requirements"
                rows={4}
                placeholder="List the qualifications and skills needed..."
                className="mt-2"
                {...register("requirements", {
                  required: "Job requirements are required",
                })}
              />
              {errors.requirements && (
                <p className="text-red-500 text-sm">
                  {errors.requirements.message}
                </p>
              )}
            </div>

            {/* Benefits */}
            <div>
              <Label>Benefits & Accommodation</Label>
              <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-3 mt-4">
                {benefitOptions.map((benefit) => (
                  <SkillTag
                    key={benefit}
                    label={benefit}
                    selected={benefits.includes(benefit)}
                    toggle={() =>
                      setBenefits((prev) =>
                        prev.includes(benefit)
                          ? prev.filter((s) => s !== benefit)
                          : [...prev, benefit],
                      )
                    }
                  />
                ))}
              </div>
            </div>

            {/* Required Gender */}
            <div>
              <Label htmlFor="gender">Required Gender</Label>
              <Controller
                name="requiredGender"
                control={control}
                rules={{ required: "Required gender is required" }}
                render={({ field }) => (
                  <Select
                    value={field.value || ""}
                    onValueChange={field.onChange}
                    key={`gender-${field.value || "new"}`}
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select required gender" />
                    </SelectTrigger>
                    <SelectContent>
                      {requiredGenderOptions.map((gender) => (
                        <SelectItem key={gender} value={gender}>
                          {gender}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.requiredGender && (
                <p className="text-red-500 text-sm">
                  {errors.requiredGender.message}
                </p>
              )}
            </div>

            {/* Deadline */}
            <div>
              <Label htmlFor="deadline">Application Deadline</Label>
              <Input
                id="deadline"
                type="datetime-local"
                className="mt-2"
                {...register("deadline", {
                  required: "Deadline is required",
                })}
              />
              {errors.deadline && (
                <p className="text-red-500 text-sm">
                  {errors.deadline.message}
                </p>
              )}
            </div>

            {/* Job Schedules */}
            <AddJobSchedules
              control={control}
              register={register}
              errors={errors}
              getValues={getValues}
              watch={watch}
            />

            {/* Urgent Job Toggle */}
            <div className="flex items-center justify-between p-4 border border-border rounded-lg">
              <div>
                <Label htmlFor="urgent">Mark as Urgent</Label>
                <p className="text-sm text-muted-foreground mt-1">
                  Urgent jobs get highlighted and prioritized
                </p>
              </div>
              <Switch
                id="urgent"
                checked={isUrgent}
                onCheckedChange={setIsUrgent}
              />
            </div>

            {/* Actions */}
            <div className="flex gap-4 pt-6">
              <Button
                type="submit"
                disabled={updateMutation.isPending}
                className="flex-1"
              >
                {updateMutation.isPending ? "Updating..." : "Update Job"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/empDashboard")}
                className="flex-1"
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

export default EditJob;
