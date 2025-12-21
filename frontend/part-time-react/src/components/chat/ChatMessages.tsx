import { BotIcon, User } from "lucide-react";
import { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";

export type Message = {
  content: string;
  role: "user" | "bot";
};

type Props = {
  messages: Message[];
};

const ChatMessages = ({ messages }: Props) => {
  const lastMessageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const onCopyMessage = (e: React.ClipboardEvent) => {
    const selection = window.getSelection()?.toString().trim();
    if (selection) {
      e.preventDefault();
      e.clipboardData.setData("text/plain", selection);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      {messages.map((message, index) => {
        const isBot = message.role === "bot";

        return (
          <div
            key={index}
            onCopy={onCopyMessage}
            ref={index === messages.length - 1 ? lastMessageRef : null}
            className={`flex items-start gap-3 max-w-md ${
              isBot ? "self-start" : "self-end flex-row-reverse"
            }`}
          >
            <div className="rounded-lg p-2  bg-yellow-200/10 pt-3">
              {isBot ? (
                <BotIcon className="w-5 h-5 text-blue-500" />
              ) : (
                <User className="w-5 h-5 text-yellow-500" />
              )}
            </div>

            <div
              className={`px-4 py-3 rounded-xl  ${
                isBot
                  ? "bg-gray-200 text-[#0f1f3d] dark:text-white dark:bg-blue-950/50"
                  : "bg-yellow-400 text-[#0f1f3d]"
              }`}
            >
              <ReactMarkdown>{message.content}</ReactMarkdown>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ChatMessages;
