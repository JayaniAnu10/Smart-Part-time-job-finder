import { useRef, useState } from "react";
import axios from "axios";
import TypingIndicator from "./TypingIndicator";
import ChatMessages, { type Message } from "./ChatMessages";
import ChatInput, { type ChatFormData } from "./ChatInput";

type ChatResponse = {
  message: string;
};

const ChatBot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const conversationId = useRef(crypto.randomUUID());

  const onSubmit = async ({ prompt }: ChatFormData) => {
    try {
      setMessages((prev) => [...prev, { content: prompt, role: "user" }]);
      setIsLoading(true);
      setError("");

      const { data } = await axios.post<ChatResponse>(
        "http://localhost:8080/api/chat",
        {
          prompt,
          conversationId: conversationId.current,
        }
      );
      setMessages((prev) => [...prev, { content: data.message, role: "bot" }]);
    } catch (error) {
      console.error(error);
      setError("Something went wrong .Try again!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-8 md:mx-40 p-8 flex flex-col h-screen pt-22">
      <div className="flex flex-col items-center gap-2">
        <div className="md:text-5xl text-4xl font-bold ">
          <span className=" text-secondary">AI Job </span>
          <span className="text-yellow-400">Assistant</span>
        </div>
        <div className="text-muted-foreground md:text-lg text-md text-center mb-6">
          Get instant help finding the perfect day job for you
        </div>
      </div>
      <div className="flex flex-col flex-1 gap-3 overflow-y-auto px-2">
        <ChatMessages messages={messages} />
        {isLoading && <TypingIndicator />}
        {error && <p className="text-red-500">{error}</p>}
      </div>
      <div className="">
        <ChatInput onSubmit={onSubmit} />
      </div>
    </div>
  );
};

export default ChatBot;
