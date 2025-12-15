import { FaArrowUp } from "react-icons/fa";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";

type FormData = {
  prompt: string;
};

const ChatBot = () => {
  const { register, handleSubmit, reset } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      onKeyDown={(e) => {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          handleSubmit(onSubmit)();
        }
      }}
      className="flex flex-col gap-2 items-end border-2 border-border p-4 rounded-3xl m-8"
    >
      <textarea
        {...register("prompt", { required: true })}
        className="w-full border-0 focus:outline-0 resize-none"
        placeholder="Ask anything..."
      />
      <Button className="w-12 h-12 rounded-full bg-[#0f1f3d] cursor-pointer hover:bg-[#0f1f3d]">
        <FaArrowUp />
      </Button>
    </form>
  );
};

export default ChatBot;
