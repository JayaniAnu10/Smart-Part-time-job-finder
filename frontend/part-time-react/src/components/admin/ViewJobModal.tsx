import { X } from "lucide-react";

interface ViewJobModalProps {
  open: boolean;
  onClose: () => void;
}

export default function ViewJobModal({ open, onClose }: ViewJobModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white dark:bg-background w-full max-w-3xl rounded-xl shadow-lg p-6 relative">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-secondary"
        >
          <X />
        </button>

        {/* Header */}
        <h2 className="text-2xl font-bold text-secondary dark:text-primary">
          Job Details
        </h2>

        <p className="text-muted-foreground mt-2">
          Admin view – read only
        </p>

        {/* Content placeholder */}
        <div className="mt-6 text-sm text-muted-foreground">
          Job details will appear here.
        </div>
      </div>
    </div>
  );
}
