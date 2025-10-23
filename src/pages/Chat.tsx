import { useState } from "react";
import apiClient from "../api/apiClient";

export default function Chat() {
  const [message, setMessage] = useState("");
  const [replies, setReplies] = useState<{ user: string; reply: string }[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!message.trim()) return;

    setLoading(true);
    try {
      const response = await apiClient.chat(null, message);
      setReplies([...replies, { user: message, reply: response.reply }]);
      setMessage("");
    } catch (error) {
      console.error("Chat error:", error);
      setReplies([
        ...replies,
        { user: message, reply: "Error: Failed to get response" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-1 overflow-y-auto p-4 max-w-2xl mx-auto w-full">
        <div className="space-y-4">
          {replies.map((item, idx) => (
            <div key={idx} className="space-y-2">
              <div className="flex justify-end">
                <div className="bg-blue-600 text-white px-4 py-2 rounded-lg max-w-xs">
                  {item.user}
                </div>
              </div>
              <div className="flex justify-start">
                <div className="bg-gray-300 text-gray-900 px-4 py-2 rounded-lg max-w-xs">
                  {item.reply}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t bg-white p-4">
        <div className="max-w-2xl mx-auto flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type your message..."
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          />
          <button
            onClick={handleSend}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg font-semibold transition"
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
}
