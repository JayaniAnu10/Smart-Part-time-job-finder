import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export interface EmployerProfileFormData {
  companyName: string;
  registrationId: string;
  contactPerson: string;
  phone: string;
  address: string;
  industry: string;
  website: string;
  description: string;
}

interface Props {
  data: EmployerProfileFormData;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onSave: () => void;
}

export default function EmployerProfileForm({
  data,
  onChange,
  onSave,
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
            className="border bg-[#FAFAFA] dark:bg-background text-secondary dark:text-primary
                        placeholder:text-secondary/50 dark:placeholder:text-primary/50 shadow-none
                        outline-none focus:ring-1 focus:ring-yellow-400 transition-all duration-200"
            />
        </Field>

        {/* Registration ID */}
        <Field label="Business Registration ID / NIC">
            <Input
            name="registrationId"
            placeholder="BR123456 / 199012345678"
            value={data.registrationId}
            onChange={onChange}
            className="border bg-[#FAFAFA] dark:bg-background text-secondary dark:text-primary
                        placeholder:text-secondary/50 dark:placeholder:text-primary/50 shadow-none
                        outline-none focus:ring-1 focus:ring-yellow-400 transition-all duration-200"
            />
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
            className="border bg-[#FAFAFA] dark:bg-background text-secondary dark:text-primary
                       placeholder:text-secondary/50 dark:placeholder:text-primary/50 shadow-none
                       outline-none focus:ring-1 focus:ring-yellow-400 transition-all duration-200"
          />
        </Field>

        <Field label="Contact Phone">
          <Input
            name="phone"
            placeholder="+94 771234567"
            value={data.phone}
            onChange={onChange}
            className="border bg-[#FAFAFA] dark:bg-background text-secondary dark:text-primary
                       placeholder:text-secondary/50 dark:placeholder:text-primary/50 shadow-none 
                       outline-none focus:ring-1 focus:ring-yellow-400 transition-all duration-200"
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
            className="border bg-[#FAFAFA] dark:bg-background text-secondary dark:text-primary
                       placeholder:text-secondary/50 dark:placeholder:text-primary/50 shadow-none 
                       outline-none focus:ring-1 focus:ring-yellow-400 transition-all duration-200"
          />
        </Field>

        <Field label="Industry">
          <Input
            name="industry"
            placeholder="Hospitality, IT, Retail"
            value={data.industry}
            onChange={onChange}
            className="border bg-[#FAFAFA] dark:bg-background text-secondary dark:text-primary
                       placeholder:text-secondary/50 dark:placeholder:text-primary/50 shadow-none 
                       outline-none focus:ring-1 focus:ring-yellow-400 transition-all duration-200"
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
            className="border bg-[#FAFAFA] dark:bg-background text-secondary dark:text-primary
                       placeholder:text-secondary/50 dark:placeholder:text-primary/50 shadow-none 
                       outline-none focus:ring-1 focus:ring-yellow-400 transition-all duration-200"
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
            className="border bg-[#FAFAFA] dark:bg-background text-secondary dark:text-primary
                       placeholder:text-secondary/50 dark:placeholder:text-primary/50 shadow-none 
                       outline-none focus:ring-1 focus:ring-yellow-400 transition-all duration-200"
          />
        </Field>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 mt-8">
        <Button
          onClick={onSave}
          className="bg-yellow-400 w-full text-secondary hover:bg-yellow-400 cursor-pointer transition-all 
                     duration-300 hover:scale-103 active:scale-97"
        >
          Save Changes
        </Button>

        <Button
          variant="outline"
          className="bg-[#FAFAFA] w-full dark:bg-background border-none shadow-xl 
                    text-secondary dark:text-primary hover:text-secondary cursor-pointer 
                    hover:bg-yellow-400 transition-all duration-300 hover:scale-103 active:scale-97"
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

