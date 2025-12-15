import { FaArrowUp } from "react-icons/fa";
import { Button } from "./ui/button";

const ChatBot = () => {
  return (
    <div className="flex flex-col gap-2 items-end border-2 border-border p-4 rounded-3xl m-8">
      <textarea
        className="w-full border-0 focus:outline-0 resize-none"
        placeholder="Ask anything..."
      />
      <Button className="w-12 h-12 rounded-full bg-[#0f1f3d] cursor-pointer hover:bg-[#0f1f3d]">
        <FaArrowUp />
      </Button>
    </div>
  );
};

export default ChatBot;
