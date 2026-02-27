import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import useUpdateProfilePicture from "@/hooks/useUpdateProfilePicture";
import useUpdateEmployerLogo from "@/hooks/useUpdateEmployerLogo";

interface Props {
  name: string;
  role: string;
  profilePicture?: string;
  userId: string;
  isEmployer?: boolean; // Flag to determine if it's employer or job seeker
}

export default function ProfileHeader({
  name,
  role,
  profilePicture,
  userId,
  isEmployer = false,
}: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string>("");

  // Use appropriate hook based on role
  const updateProfilePictureMutation = useUpdateProfilePicture(userId);
  const updateLogoMutation = useUpdateEmployerLogo(userId);

  const updateMutation = isEmployer
    ? updateLogoMutation
    : updateProfilePictureMutation;

  // Set initial preview from profilePicture prop
  useEffect(() => {
    if (profilePicture) {
      setPreview(profilePicture);
    }
  }, [profilePicture]);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Create preview
    const imageUrl = URL.createObjectURL(file);
    setPreview(imageUrl);

    // Upload to backend
    try {
      await updateMutation.mutateAsync(file);
    } catch (error) {
      console.error("Error uploading image:", error);
      // Revert preview on error
      if (profilePicture) {
        setPreview(profilePicture);
      } else {
        setPreview("");
      }
    }
  };

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="flex flex-col sm:flex-row items-center gap-6">
      <div className="relative">
        <Avatar className="h-28 w-28">
          <AvatarImage
            src={preview}
            className="object-cover w-full h-full rounded-full"
          />
          <AvatarFallback className="bg-yellow-400/10 dark:bg-[#E0E7F5]/70 text-yellow-400 dark:text-secondary text-5xl">
            {initials || name[0]}
          </AvatarFallback>
        </Avatar>

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className="hidden"
          onChange={handleImageChange}
          disabled={updateMutation.isPending}
        />

        <button
          type="button"
          onClick={handleClick}
          disabled={updateMutation.isPending}
          className="absolute bottom-1 border-none right-1 rounded-full bg-yellow-400 p-2 text-secondary shadow transition hover:bg-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed"
          title={isEmployer ? "Update company logo" : "Update profile picture"}
        >
          <Camera size={16} />
        </button>
      </div>

      <div className="text-center sm:text-left">
        <h2 className="text-2xl font-semibold text-secondary dark:text-primary">
          {name}
        </h2>
        <p className="text-sm text-secondary/70 dark:text-primary/70">{role}</p>
      </div>
    </div>
  );
}
