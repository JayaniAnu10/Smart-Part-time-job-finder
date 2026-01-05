import { Bot, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AIButton = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <button className="group relative" onClick={() => navigate("/chatbot")}>
        <div className="relative flex items-center gap-2 bg-yellow-400 text-[#0f1f3d] px-5 py-3.5 rounded-full shadow-2xl hover:shadow-glow transition-all duration-300 transform group hover:scale-105 cursor-pointer">
          {/* Animated icon container */}
          <div className="relative">
            <Bot className="h-6 w-6 transition-all duration-300 group-hover:rotate-30" />
          </div>

          {/* Text */}
          <span className="font-display font-bold text-sm whitespace-nowrap">
            AI Assistant
          </span>

          {/* Notification dot */}
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-4 w-4 bg-yellow-400 items-center justify-center">
              <Zap className="h-2.5 w-2.5 text-yellow-900" />
            </span>
          </span>
        </div>
      </button>
    </div>
  );
};

export default AIButton;
