import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Camera } from "lucide-react";
import { useRef, useState } from "react";

interface Props {
  name: string;
  role: string;
}

export default function ProfileHeader({ name, role }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string>("");

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setPreview(imageUrl);
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-6">
      <div className="relative">
        <Avatar className="h-28 w-28">
          <AvatarImage
            src={preview}
            className="object-cover w-full h-full rounded-full"
          />
          <AvatarFallback className="bg-yellow-400/10 dark:bg-[#E0E7F5]/70 text-yellow-400 dark:text-secondary text-5xl">
            {name[0]}
          </AvatarFallback>
        </Avatar>

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className="hidden"
          onChange={handleImageChange}
        />

        <button
          type="button"
          onClick={handleClick}
          className="absolute bottom-1 right-1 rounded-full bg-yellow-400 p-2 text-secondary shadow transition"
        >
          <Camera size={16} />
        </button>
      </div>

      <div className="text-center sm:text-left">
        <h2 className="text-2xl font-semibold text-secondary dark:text-primary">
          {name}
        </h2>
        <p className="text-sm text-secondary/70 dark:text-primary/70">
          {role}
        </p>
      </div>
    </div>
  );
}
