import { Button } from "../ui/button";
import { FaArrowUp } from "react-icons/fa";
import { useForm } from "react-hook-form";
import type { KeyboardEvent } from "react";

export type ChatFormData = {
  prompt: string;
};

type Props = {
  onSubmit: (data: ChatFormData) => void;
};

const ChatInput = ({ onSubmit }: Props) => {
  const { register, handleSubmit, reset, formState } = useForm<ChatFormData>();

  const submit = handleSubmit((data) => {
    reset({ prompt: "" });
    onSubmit(data);
  });

  const handleKeyDown = (e: KeyboardEvent<HTMLFormElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };

  return (
    <form
      onSubmit={submit}
      onKeyDown={handleKeyDown}
      className="flex flex-col gap-1 items-end border-2 border-border p-4 rounded-3xl mt-10"
    >
      <textarea
        {...register("prompt", {
          required: true,
          validate: (data) => data.trim().length > 0,
        })}
        autoFocus
        className="w-full border-0 focus:outline-0 resize-none"
        placeholder="Ask me anything about jobs..."
      />
      <Button
        disabled={!formState.isValid}
        className="w-11 h-11 rounded-full text-[#0f1f3d] cursor-pointer"
      >
        <FaArrowUp />
      </Button>
    </form>
  );
};

export default ChatInput;
