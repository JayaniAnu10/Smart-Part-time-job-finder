import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Schedule = {
  startDatetime: string;
  endDatetime: string;
  requiredWorkers: string;
};

export default function AddJobSchedules() {
  const [schedules, setSchedules] = useState([
    { startDatetime: "", endDatetime: "", requiredWorkers: "" },
  ]);

  const addSchedule = () => {
    setSchedules([
      ...schedules,
      { startDatetime: "", endDatetime: "", requiredWorkers: "" },
    ]);
  };

  const removeSchedule = (index: number) => {
    setSchedules(schedules.filter((_, i) => i !== index));
  };

  const updateSchedule = (
    index: number,
    field: keyof Schedule,
    value: string
  ) => {
    setSchedules((prev) =>
      prev.map((s, i) => (i === index ? { ...s, [field]: value } : s))
    );
  };

  return (
    <div className="space-y-6">
      {schedules.map((schedule, index) => (
        <div
          key={index}
          className="p-4 border rounded-2xl grid md:grid-cols-3 gap-4"
        >
          <div>
            <Label>Start</Label>
            <Input
              type="datetime-local"
              value={schedule.startDatetime}
              onChange={(e) =>
                updateSchedule(index, "startDatetime", e.target.value)
              }
            />
          </div>

          <div>
            <Label>End</Label>
            <Input
              type="datetime-local"
              value={schedule.endDatetime}
              onChange={(e) =>
                updateSchedule(index, "endDatetime", e.target.value)
              }
            />
          </div>

          <div>
            <Label>Required Workers</Label>
            <Input
              type="number"
              min={1}
              value={schedule.requiredWorkers}
              onChange={(e) =>
                updateSchedule(index, "requiredWorkers", e.target.value)
              }
            />
          </div>

          {schedules.length > 1 && (
            <Button
              variant="destructive"
              onClick={() => removeSchedule(index)}
              className="mt-2 md:col-span-3"
            >
              Remove
            </Button>
          )}
        </div>
      ))}

      <Button onClick={addSchedule} variant="outline">
        + Add Schedule
      </Button>
    </div>
  );
}
