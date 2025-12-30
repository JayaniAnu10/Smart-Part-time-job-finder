import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Schedules } from "@/hooks/useJobs";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface ScheduleModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  schedules: Schedules[];
  onApply: (scheduleId: string) => void;
  isLoading: boolean;
}

const ScheduleDialog = ({
  open,
  setOpen,
  schedules,
  onApply,
  isLoading,
}: ScheduleModalProps) => {
  const [selectedSchedule, setSelectedSchedule] = useState<string | null>(null);

  useEffect(() => {
    if (open) setSelectedSchedule(null);
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select a Schedule</DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          {schedules.map((s) => {
            const start = new Date(s.startDatetime);
            const end = new Date(s.endDatetime);

            return (
              <label
                key={s.id}
                className="flex items-center gap-3 border rounded-xl p-3 cursor-pointer"
              >
                <input
                  type="radio"
                  name="schedule"
                  value={s.id}
                  onChange={() => setSelectedSchedule(s.id)}
                />
                <div>
                  <p className="font-medium">
                    {start.toLocaleDateString(undefined, {
                      dateStyle: "medium",
                    })}{" "}
                    •{" "}
                    {start.toLocaleTimeString(undefined, {
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: true,
                    })}{" "}
                    →{" "}
                    {end.toLocaleTimeString(undefined, {
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </p>
                </div>
              </label>
            );
          })}
        </div>

        <Button
          disabled={isLoading}
          className="mt-4 w-full bg-yellow-400 text-[#0f1f3d] hover:bg-yellow-300"
          onClick={() => {
            if (!selectedSchedule) {
              toast.error("Please select a schedule to apply.");
              return;
            }
            onApply(selectedSchedule);
          }}
        >
          {isLoading ? "Submitting..." : "Confirm Apply"}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default ScheduleDialog;
