import { FaArrowUp } from "react-icons/fa";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import { useRef, type KeyboardEvent } from "react";
import axios from "axios";

type FormData = {
  prompt: string;
};

const ChatBot = () => {
  const conversationId = useRef(crypto.randomUUID);
  const { register, handleSubmit, reset, formState } = useForm<FormData>();

  const onSubmit = async ({ prompt }: FormData) => {
    reset();
    const { data } = await axios.post("http://localhost:8080/api/chat", {
      prompt,
      conversationId: conversationId.current,
    });
    console.log(data);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLFormElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(onSubmit)();
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      onKeyDown={onKeyDown}
      className="flex flex-col gap-2 items-end border-2 border-border p-4 rounded-3xl m-8"
    >
      <textarea
        {...register("prompt", {
          required: true,
          validate: (data) => data.trim().length > 0,
        })}
        className="w-full border-0 focus:outline-0 resize-none"
        placeholder="Ask anything..."
      />
      <Button
        disabled={!formState.isValid}
        className="w-11 h-11 rounded-full bg-[#0f1f3d] cursor-pointer hover:bg-[#0f1f3d]"
      >
        <FaArrowUp />
      </Button>
    </form>
  );
};

export default ChatBot;
