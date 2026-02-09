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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onSave: () => void;
}

export default function ProfileForm({
  data,
  onChange,
  onSave,
}: Props) {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 space-y-5">
        <Field label="First Name">
          <Input name="firstName" 
                 placeholder="John"
                 value={data.firstName} 
                 onChange={onChange}
                 className="border bg-[#FAFAFA] dark:bg-background text-secondary dark:text-primary
                            placeholder:text-secondary/50 dark:placeholder:text-primary/50 shadow-none
                            outline-none focus:ring-1 focus:ring-yellow-400 transition-all duration-200" />
        </Field>

        <Field label="Last Name">
          <Input name="lastName"
                 placeholder="Doe" 
                 value={data.lastName} 
                 onChange={onChange}
                 className="border bg-[#FAFAFA] dark:bg-background text-secondary dark:text-primary
                            placeholder:text-secondary/50 dark:placeholder:text-primary/50 shadow-none
                            outline-none focus:ring-1 focus:ring-yellow-400 transition-all duration-200" />
        </Field>
      </div>

      <div className="md:col-span-2 space-y-5">
        <Field label="Email Address">
          <Input name="email" 
                 placeholder="john.doe@gmail.com"
                 value={data.email} 
                 onChange={onChange}
                 className="border bg-[#FAFAFA] dark:bg-background text-secondary dark:text-primary
                            placeholder:text-secondary/50 dark:placeholder:text-primary/50 shadow-none
                            outline-none focus:ring-1 focus:ring-yellow-400 transition-all duration-200" />
        </Field>

        <Field label="Phone Number">
          <Input name="phone" 
                 placeholder="+94 7434567890"
                 value={data.phone} 
                 onChange={onChange}
                 className="border bg-[#FAFAFA] dark:bg-background text-secondary dark:text-primary
                            placeholder:text-secondary/50 dark:placeholder:text-primary/50 shadow-none
                            outline-none focus:ring-1 focus:ring-yellow-400 transition-all duration-200" />
        </Field>

        <Field label="Address">
          <Input name="address" 
                 placeholder="12 Main Street, Colombo"
                 value={data.address} 
                 onChange={onChange}
                 className="border bg-[#FAFAFA] dark:bg-background text-secondary dark:text-primary
                            placeholder:text-secondary/50 dark:placeholder:text-primary/50 shadow-none
                            outline-none focus:ring-1 focus:ring-yellow-400 transition-all duration-200"/>
        </Field>

        <Field label="NIC Number">
          <Input name="nic"
                 placeholder="19951234567" 
                 value={data.nic} 
                 onChange={onChange}
                 className="border bg-[#FAFAFA] dark:bg-background text-secondary dark:text-primary
                            placeholder:text-secondary/50 dark:placeholder:text-primary/50 shadow-none
                            outline-none focus:ring-1 focus:ring-yellow-400 transition-all duration-200" />
        </Field>
        
          <Field label="Bio">
            <Textarea name="bio" 
                     placeholder="Tell us about your self..."
                      rows={4} 
                      value={data.bio} 
                      onChange={onChange}
                      className="border bg-[#FAFAFA] dark:bg-background text-secondary dark:text-primary
                                 placeholder:text-secondary/50 dark:placeholder:text-primary/50 shadow-none
                                 outline-none focus:ring-1 focus:ring-yellow-400 transition-all duration-200" />
          </Field>

          <Field label="Skills">
            <Input
              name="skills"
              placeholder="e.g. Driving, Customer Service"
              value={data.skills}
              onChange={onChange}
              className="border bg-[#FAFAFA] dark:bg-background text-secondary dark:text-primary
                         placeholder:text-secondary/50 dark:placeholder:text-primary/50 shadow-none
                         outline-none focus:ring-1 focus:ring-yellow-400 transition-all duration-200" />
          </Field>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mt-8">
        <Button
          onClick={onSave}
          className="bg-yellow-400 w-full text-secondary hover:bg-yellow-400 cursor-pointer transition-all duration-300 hover:scale-103 active:scale-97"
        >
          Save Changes
        </Button>

        <Button variant="outline" className="bg-[#FAFAFA] w-full dark:bg-background border-none shadow-xl text-secondary dark:text-primary
                                             hover:text-secondary cursor-pointer hover:bg-yellow-400 transition-all duration-300 hover:scale-103 active:scale-97">
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
