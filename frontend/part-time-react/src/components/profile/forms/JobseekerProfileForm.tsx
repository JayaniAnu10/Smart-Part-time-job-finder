import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export interface ProfileFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  nic: string;
  bio: string;
  skills: string;
}

interface Props {
  data: ProfileFormData;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  onSave: () => void;
  onCancel?: () => void; // new optional prop
  isLoading?: boolean;
}

export default function ProfileForm({
  data,
  onChange,
  onSave,
  onCancel,
  isLoading = false,
}: Props) {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 space-y-5">
        <Field label="First Name">
          <Input
            name="firstName"
            placeholder="John"
            value={data.firstName}
            onChange={onChange}
            disabled={isLoading}
            className="border bg-[#FAFAFA] dark:bg-background text-secondary dark:text-primary
                            placeholder:text-secondary/50 dark:placeholder:text-primary/50 shadow-none
                            outline-none focus:ring-1 focus:ring-yellow-400 transition-all duration-200 disabled:opacity-50"
          />
        </Field>

        <Field label="Last Name">
          <Input
            name="lastName"
            placeholder="Doe"
            value={data.lastName}
            onChange={onChange}
            disabled={isLoading}
            className="border bg-[#FAFAFA] dark:bg-background text-secondary dark:text-primary
                            placeholder:text-secondary/50 dark:placeholder:text-primary/50 shadow-none
                            outline-none focus:ring-1 focus:ring-yellow-400 transition-all duration-200 disabled:opacity-50"
          />
        </Field>
      </div>

      <div className="md:col-span-2 space-y-5">
        <Field label="Email Address">
          <Input
            name="email"
            placeholder="john.doe@gmail.com"
            value={data.email}
            onChange={onChange}
            disabled={true}
            className="border bg-[#FAFAFA] dark:bg-background text-secondary dark:text-primary
                            placeholder:text-secondary/50 dark:placeholder:text-primary/50 shadow-none
                            outline-none focus:ring-1 focus:ring-yellow-400 transition-all duration-200 opacity-50 cursor-not-allowed"
          />
          <p className="text-xs text-secondary/60 dark:text-primary/60 mt-1">
            Email cannot be changed
          </p>
        </Field>

        <Field label="Phone Number">
          <Input
            name="phone"
            placeholder="+94 7434567890"
            value={data.phone}
            onChange={onChange}
            disabled={isLoading}
            className="border bg-[#FAFAFA] dark:bg-background text-secondary dark:text-primary
                            placeholder:text-secondary/50 dark:placeholder:text-primary/50 shadow-none
                            outline-none focus:ring-1 focus:ring-yellow-400 transition-all duration-200 disabled:opacity-50"
          />
        </Field>

        <Field label="Address">
          <Input
            name="address"
            placeholder="12 Main Street, Colombo"
            value={data.address}
            onChange={onChange}
            disabled={isLoading}
            className="border bg-[#FAFAFA] dark:bg-background text-secondary dark:text-primary
                            placeholder:text-secondary/50 dark:placeholder:text-primary/50 shadow-none
                            outline-none focus:ring-1 focus:ring-yellow-400 transition-all duration-200 disabled:opacity-50"
          />
        </Field>

        <Field label="NIC Number">
          <Input
            name="nic"
            placeholder="19951234567"
            value={data.nic}
            onChange={onChange}
            disabled={isLoading}
            className="border bg-[#FAFAFA] dark:bg-background text-secondary dark:text-primary
                            placeholder:text-secondary/50 dark:placeholder:text-primary/50 shadow-none
                            outline-none focus:ring-1 focus:ring-yellow-400 transition-all duration-200 disabled:opacity-50"
          />
        </Field>

        <Field label="Bio">
          <Textarea
            name="bio"
            placeholder="Tell us about yourself..."
            rows={4}
            value={data.bio}
            onChange={onChange}
            disabled={isLoading}
            className="border bg-[#FAFAFA] dark:bg-background text-secondary dark:text-primary
                                 placeholder:text-secondary/50 dark:placeholder:text-primary/50 shadow-none
                                 outline-none focus:ring-1 focus:ring-yellow-400 transition-all duration-200 disabled:opacity-50"
          />
        </Field>

        <Field label="Skills">
          <Input
            name="skills"
            placeholder="e.g. Driving, Customer Service"
            value={data.skills}
            onChange={onChange}
            disabled={isLoading}
            className="border bg-[#FAFAFA] dark:bg-background text-secondary dark:text-primary
                         placeholder:text-secondary/50 dark:placeholder:text-primary/50 shadow-none
                         outline-none focus:ring-1 focus:ring-yellow-400 transition-all duration-200 disabled:opacity-50"
          />
        </Field>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mt-8">
        <Button
          onClick={onSave}
          disabled={isLoading}
          className="bg-yellow-400 w-full text-secondary hover:bg-yellow-400 cursor-pointer transition-all duration-300 hover:scale-101 active:scale-97 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>

        <Button
          variant="outline"
          disabled={isLoading}
          onClick={onCancel}
          className="bg-[#FAFAFA] w-full dark:bg-background border shadow-xl text-secondary dark:text-primary cursor-pointer  transition-all duration-300  active:scale-97 disabled:opacity-50"
        >
          Cancel
        </Button>
      </div>
    </>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium text-secondary dark:text-primary">
        {label}
      </label>
      {children}
    </div>
  );
}
