import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { JobData } from "@/hooks/useAddJob";
import {
  useFieldArray,
  type Control,
  type FieldErrors,
  type UseFormGetValues,
  type UseFormRegister,
  type UseFormWatch,
} from "react-hook-form";

type Props = {
  control: Control<JobData>;
  register: UseFormRegister<JobData>;
  errors: FieldErrors<JobData>;
  watch: UseFormWatch<JobData>;
  getValues: UseFormGetValues<JobData>;
};

export default function AddJobSchedules({
  control,
  register,
  errors,
  watch,
  getValues,
}: Props) {
  const deadline = watch("deadline");
  const { fields, append, remove } = useFieldArray<JobData>({
    control,
    name: "schedules",
  });

  return (
    <div className="space-y-6 border p-5 rounded-2xl border-input">
      {fields.map((field, index) => (
        <div
          key={field.id}
          className="p-4 border rounded-2xl grid md:grid-cols-3 gap-4"
        >
          <div>
            <Label htmlFor={`schedules.${index}.startDatetime`}>Start</Label>
            <Input
              type="datetime-local"
              id={`schedules.${index}.startDatetime`}
              {...register(`schedules.${index}.startDatetime`, {
                required: "Start time is required",
                validate: (start) => {
                  const deadline = getValues("deadline");
                  if (!deadline) return true;

                  return (
                    new Date(start) > new Date(deadline) ||
                    "Start time must be AFTER the application deadline"
                  );
                },
              })}
            />
            {errors.schedules?.[index]?.startDatetime && (
              <p className="text-red-500 text-sm">
                {errors.schedules[index].startDatetime?.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor={`schedules.${index}.endDatetime`}>End</Label>
            <Input
              type="datetime-local"
              id={`schedules.${index}.endDatetime`}
              {...register(`schedules.${index}.endDatetime`, {
                required: "End time is required",
                validate: (end) => {
                  const start = getValues(`schedules.${index}.startDatetime`);
                  return (
                    new Date(end) > new Date(start) ||
                    "End time must be after start time"
                  );
                },
              })}
            />
            {errors.schedules?.[index]?.endDatetime && (
              <p className="text-red-500 text-sm">
                {errors.schedules[index].endDatetime?.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor={`schedules.${index}.requiredWorkers`}>
              Required Workers
            </Label>
            <Input
              type="number"
              min={1}
              id={`schedules.${index}.requiredWorkers`}
              {...register(`schedules.${index}.requiredWorkers`, {
                valueAsNumber: true,
                min: 1,
                required: "Workers required",
              })}
            />
            {errors.schedules?.[index]?.requiredWorkers && (
              <p className="text-red-500 text-sm">
                {errors.schedules[index].requiredWorkers?.message}
              </p>
            )}
          </div>

          {fields.length > 1 && (
            <div className="md:col-span-3 flex justify-end mt-2">
              <Button
                variant="destructive"
                onClick={() => remove(index)}
                type="button"
              >
                Remove
              </Button>
            </div>
          )}
        </div>
      ))}

      <div className="flex justify-end">
        <Button
          type="button"
          variant="outline"
          onClick={() =>
            append({
              startDatetime: "",
              endDatetime: "",
              requiredWorkers: 1,
            })
          }
        >
          + Add Schedule
        </Button>
      </div>
    </div>
  );
}
