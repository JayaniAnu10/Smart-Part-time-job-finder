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
    <div className="m-8 flex flex-col h-screen">
      <div className="flex flex-col flex-1 gap-3 mb-5 overflow-y-auto">
        <ChatMessages messages={messages} />
        {isLoading && <TypingIndicator />}
        {error && <p className="text-red-500">{error}</p>}
      </div>
      <ChatInput onSubmit={onSubmit} />
    </div>
  );
};

export default ChatBot;
