import { FaArrowUp } from "react-icons/fa";
import { Button } from "./ui/button";
import ReactMarkdown from "react-markdown";
import { useForm } from "react-hook-form";
import { useRef, useState, type KeyboardEvent } from "react";
import axios from "axios";

type FormData = {
  prompt: string;
};

type ChatResponse = {
  message: string;
};

type Message = {
  content: string;
  role: "user" | "bot";
};

const ChatBot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const conversationId = useRef(crypto.randomUUID());
  const { register, handleSubmit, reset, formState } = useForm<FormData>();

  const onSubmit = async ({ prompt }: FormData) => {
    setMessages((prev) => [...prev, { content: prompt, role: "user" }]);
    setIsLoading(true);
    reset();
    const { data } = await axios.post<ChatResponse>(
      "http://localhost:8080/api/chat",
      {
        prompt,
        conversationId: conversationId.current,
      }
    );
    setMessages((prev) => [...prev, { content: data.message, role: "bot" }]);
    setIsLoading(false);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLFormElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(onSubmit)();
    }
  };

  return (
    <div className="m-8">
      <div className="flex flex-col gap-3 mb-5">
        {messages.map((message, index) => (
          <p
            key={index}
            className={`px-3 py-1 rounded-xl ${
              message.role === "user"
                ? "bg-yellow-400 text-[#0f1f3d] self-end"
                : "bg-gray-200 text-[#0f1f3d] dark:text-white dark:bg-blue-900 self-start"
            }`}
          >
            <ReactMarkdown>{message.content}</ReactMarkdown>
          </p>
        ))}
        {isLoading && (
          <div className="flex self-start gap-1 px-3 py-3 bg-gray-200 rounded-xl">
            <div className="w-2 h-2 rounded-full bg-gray-800 animate-pulse"></div>
            <div className="w-2 h-2 rounded-full bg-gray-800 animate-pulse [animation-delay:0.2s]"></div>
            <div className="w-2 h-2 rounded-full bg-gray-800 animate-pulse [animation-delay:0.4s]"></div>
          </div>
        )}
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        onKeyDown={onKeyDown}
        className="flex flex-col gap-1 items-end border-2 border-border p-4 rounded-3xl mt-10"
      >
        <textarea
          {...register("prompt", {
            required: true,
            validate: (data) => data.trim().length > 0,
          })}
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
    </div>
  );
};

export default ChatBot;
