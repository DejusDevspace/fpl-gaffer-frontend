import { useState, useEffect, useRef } from "react";
import { Send, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSidebar } from "../hooks/useSidebar";
import apiClient from "../api/apiClient";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const DEMO_QUESTIONS = [
  "What transfers should I make this week?",
  "Who should be my captain?",
  "Analyze my team's performance",
  "What's my best strategy going forward?",
];

export default function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [fplTeam, setFplTeam] = useState<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const navigate = useNavigate();
  const { isOpen } = useSidebar();

  useEffect(() => {
    loadFPLTeam();
    loadInitialMessage();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      const newHeight = Math.min(textareaRef.current.scrollHeight, 200);
      textareaRef.current.style.height = `${newHeight}px`;
    }
  }, [message]);

  const loadFPLTeam = async () => {
    try {
      const team = await apiClient.getFPLTeam();
      setFplTeam(team);
    } catch (error) {
      console.error("Error loading FPL team:", error);
    }
  };

  const loadInitialMessage = () => {
    setMessages([]);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = async (textToSend?: string) => {
    const textContent = textToSend || message;
    if (!textContent.trim() || loading) return;

    const userMessage: Message = {
      role: "user",
      content: textContent,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setMessage("");
    setLoading(true);

    try {
      // Add FPL context to message if available
      let contextualMessage = textContent;
      if (fplTeam) {
        contextualMessage = `[User's FPL Team: ${fplTeam.team_name}, Current GW: ${fplTeam.current_gameweek}, Overall Rank: ${fplTeam.overall_rank}, Points: ${fplTeam.overall_points}]\n\n${textContent}`;
      }

      const response = await apiClient.chat(contextualMessage);

      const assistantMessage: Message = {
        role: "assistant",
        content: response.reply,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I encountered an error. Please try again.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div
        className={`bg-surface shadow-sm border-b border-aux p-4 flex items-center gap-4 transition-all duration-300 ${
          isOpen ? "-ml-72 pl-72" : "-ml-20 pl-20"
        }`}
      >
        <button
          onClick={() => navigate("/dashboard")}
          className="text-muted hover:text-primary ml-2"
        >
          <ArrowLeft size={24} />
        </button>
        <div>
          <h1 className="text-xl font-bold text-primary">Chat with Gaffer</h1>
          {fplTeam && <p className="text-sm text-muted">{fplTeam.team_name}</p>}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 max-w-4xl mx-auto w-full">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] rounded-lg px-4 py-3 ${
                msg.role === "user"
                  ? "bg-accent text-primary"
                  : "bg-surface border border-aux shadow text-primary"
              }`}
            >
              <p className="whitespace-pre-wrap">{msg.content}</p>
              <p
                className={`text-xs mt-2 ${
                  msg.role === "user" ? "text-primary/70" : "text-muted"
                }`}
              >
                {msg.timestamp.toLocaleTimeString()}
              </p>
            </div>
          </div>
        ))}

        {messages.length === 0 && (
          <div className="flex-1 flex items-center justify-center">
            <div className="space-y-6 text-center max-w-2xl">
              <div>
                <h2 className="text-2xl font-bold text-accent mb-2">
                  What would you like to know?
                </h2>
                <p className="text-sm text-muted">
                  Tap a question below or ask your own
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {DEMO_QUESTIONS.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(q)}
                    disabled={loading}
                    className="p-4 rounded-lg bg-surface border border-aux
                    hover:border-accent hover:bg-surface/80 transition disabled:opacity-50
                    text-primary text-left font-medium hover:shadow-lg"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-surface border border-aux shadow rounded-lg px-4 py-3">
              <div className="flex gap-2">
                <div className="w-2 h-2 bg-neutral rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-neutral rounded-full animate-bounce delay-100" />
                <div className="w-2 h-2 bg-neutral rounded-full animate-bounce delay-200" />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="bg-surface border-t border-aux p-4">
        <div className="max-w-4xl mx-auto flex gap-2 items-end">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Ask about transfers, captains, strategy..."
            disabled={loading}
            rows={1}
            className="flex-1 border border-aux bg-surface text-primary placeholder:text-primary/15
            rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent
            disabled:bg-neutral resize-none overflow-hidden max-h-[200px]"
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              handleSend();
            }}
            disabled={loading || !message.trim()}
            className="btn-primary disabled:bg-neutral p-3 rounded-lg transition"
          >
            <Send size={20} />
          </button>
        </div>
        <p className="text-xs text-muted text-center mt-2">
          Gaffer has access to your team stats and current gameweek
        </p>
      </div>
    </div>
  );
}
