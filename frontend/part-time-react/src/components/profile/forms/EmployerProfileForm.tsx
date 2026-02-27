import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export interface EmployerProfileFormData {
  companyName: string;
  registrationId: string;
  contactPerson: string;
  phone: string;
  email: string;
  contact: string;
  address: string;
  industry: string;
  website: string;
  description: string;
}

interface Props {
  data: EmployerProfileFormData;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  onSave: () => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

export default function EmployerProfileForm({
  data,
  onChange,
  onSave,
  onCancel,
  isLoading = false,
}: Props) {
  return (
    <>
      {/* Company Name */}
      <div className="space-y-5">
        <Field label="Company Name">
          <Input
            name="companyName"
            placeholder="ABC Solutions Pvt Ltd"
            value={data.companyName}
            onChange={onChange}
            disabled={isLoading}
            className="border bg-[#FAFAFA] dark:bg-background text-secondary dark:text-primary
                        placeholder:text-secondary/50 dark:placeholder:text-primary/50 shadow-none
                        outline-none focus:ring-1 focus:ring-yellow-400 transition-all duration-200 disabled:opacity-50"
          />
        </Field>

        {/* Registration ID */}
        <Field label="Business Registration ID / NIC">
          <Input
            name="registrationId"
            placeholder="BR123456 / 199012345678"
            value={data.registrationId}
            onChange={onChange}
            disabled={isLoading}
            className="border bg-[#FAFAFA] dark:bg-background text-secondary dark:text-primary
                        placeholder:text-secondary/50 dark:placeholder:text-primary/50 shadow-none
                        outline-none focus:ring-1 focus:ring-yellow-400 transition-all duration-200 disabled:opacity-50"
          />
        </Field>

        {/* Email */}
        <Field label="Email Address">
          <Input
            name="email"
            placeholder="company@email.com"
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
      </div>

      {/* Contact person */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
        <Field label="Contact Person Name">
          <Input
            name="contactPerson"
            placeholder="John Doe"
            value={data.contactPerson}
            onChange={onChange}
            disabled={isLoading}
            className="border bg-[#FAFAFA] dark:bg-background text-secondary dark:text-primary
                       placeholder:text-secondary/50 dark:placeholder:text-primary/50 shadow-none
                       outline-none focus:ring-1 focus:ring-yellow-400 transition-all duration-200 disabled:opacity-50"
          />
        </Field>

        <Field label="Contact Phone">
          <Input
            name="phone"
            placeholder="+94 771234567"
            value={data.phone}
            onChange={onChange}
            disabled={isLoading}
            className="border bg-[#FAFAFA] dark:bg-background text-secondary dark:text-primary
                       placeholder:text-secondary/50 dark:placeholder:text-primary/50 shadow-none 
                       outline-none focus:ring-1 focus:ring-yellow-400 transition-all duration-200 disabled:opacity-50"
          />
        </Field>
      </div>

      {/* Additional Contact */}
      <div className="mt-5">
        <Field label="Additional Contact Number">
          <Input
            name="contact"
            placeholder="+94 112345678"
            value={data.contact}
            onChange={onChange}
            disabled={isLoading}
            className="border bg-[#FAFAFA] dark:bg-background text-secondary dark:text-primary
                       placeholder:text-secondary/50 dark:placeholder:text-primary/50 shadow-none 
                       outline-none focus:ring-1 focus:ring-yellow-400 transition-all duration-200 disabled:opacity-50"
          />
        </Field>
      </div>

      {/* Address + Industry */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
        <Field label="Company Address">
          <Input
            name="address"
            placeholder="No 12, Main Street, Colombo"
            value={data.address}
            onChange={onChange}
            disabled={isLoading}
            className="border bg-[#FAFAFA] dark:bg-background text-secondary dark:text-primary
                       placeholder:text-secondary/50 dark:placeholder:text-primary/50 shadow-none 
                       outline-none focus:ring-1 focus:ring-yellow-400 transition-all duration-200 disabled:opacity-50"
          />
        </Field>

        <Field label="Industry">
          <Input
            name="industry"
            placeholder="Hospitality, IT, Retail"
            value={data.industry}
            onChange={onChange}
            disabled={isLoading}
            className="border bg-[#FAFAFA] dark:bg-background text-secondary dark:text-primary
                       placeholder:text-secondary/50 dark:placeholder:text-primary/50 shadow-none 
                       outline-none focus:ring-1 focus:ring-yellow-400 transition-all duration-200 disabled:opacity-50"
          />
        </Field>
      </div>

      {/* Website */}
      <div className="mt-5">
        <Field label="Website">
          <Input
            name="website"
            placeholder="https://www.company.com"
            value={data.website}
            onChange={onChange}
            disabled={isLoading}
            className="border bg-[#FAFAFA] dark:bg-background text-secondary dark:text-primary
                       placeholder:text-secondary/50 dark:placeholder:text-primary/50 shadow-none 
                       outline-none focus:ring-1 focus:ring-yellow-400 transition-all duration-200 disabled:opacity-50"
          />
        </Field>
      </div>

      {/* Description */}
      <div className="mt-5">
        <Field label="Company Description">
          <Textarea
            name="description"
            rows={4}
            placeholder="Tell job seekers about your company..."
            value={data.description}
            onChange={onChange}
            disabled={isLoading}
            className="border bg-[#FAFAFA] dark:bg-background text-secondary dark:text-primary
                       placeholder:text-secondary/50 dark:placeholder:text-primary/50 shadow-none 
                       outline-none focus:ring-1 focus:ring-yellow-400 transition-all duration-200 disabled:opacity-50"
          />
        </Field>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 mt-8">
        <Button
          onClick={onSave}
          disabled={isLoading}
          className="bg-yellow-400 w-full text-secondary hover:bg-yellow-400 cursor-pointer transition-all 
                     duration-300 hover:scale-103 active:scale-97 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>

        <Button
          variant="outline"
          disabled={isLoading}
          onClick={onCancel}
          className="bg-[#FAFAFA] w-full dark:bg-background border shadow-xl text-secondary dark:text-primary cursor-pointer transition-all duration-300 active:scale-97 disabled:opacity-50"
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
