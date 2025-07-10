// App.js
import { useEffect, useRef, useState } from "react";
import {
  Send,
  Users,
  Copy,
  Check,
  Hash,
  Plus,
  MessageCircle,
  Wifi,
  WifiOff,
} from "lucide-react";
import "./App.css";

function App() {
  const [messages, setMessages] = useState([]);
  const [roomid, setRoomid] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [currentMessage, setCurrentMessage] = useState("");
  const [username, setUsername] = useState("");
  const [hasJoinedRoom, setHasJoinedRoom] = useState(false);
  const [copiedRoomId, setCopiedRoomId] = useState(false);

  const wssRef = useRef();
  const chatBottomRef = useRef();
  const messageInputRef = useRef();

  function sendMessage() {
    const message = currentMessage.trim();
    if (
      !message ||
      !roomid ||
      !wssRef.current ||
      wssRef.current.readyState !== WebSocket.OPEN
    )
      return;

    const messageData = {
      type: "chat",
      payload: {
        roomId: roomid,
        message,
        username: username || "Anonymous",
        timestamp: new Date().toISOString(),
      },
    };

    wssRef.current.send(JSON.stringify(messageData));
    setCurrentMessage("");
  }

  function handleKeyPress(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  function createRoomIdHandler() {
    const uniqueId = Math.random().toString(36).substring(2, 8).toUpperCase();
    setRoomid(uniqueId);
  }

  function joinRoomHandler() {
    if (!roomid.trim()) return;
    setHasJoinedRoom(true);
  }

  function copyRoomId() {
    navigator.clipboard.writeText(roomid);
    setCopiedRoomId(true);
    setTimeout(() => setCopiedRoomId(false), 2000);
  }

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");
    wssRef.current = ws;

    ws.onopen = () => setIsConnected(true);
    ws.onclose = () => setIsConnected(false);
    ws.onerror = (err) => console.error("WebSocket error:", err);

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        setMessages((prev) => [...prev, data]);
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            message: event.data,
            username: "System",
            timestamp: new Date().toISOString(),
          },
        ]);
      }
    };

    return () => ws.close();
  }, []);

  useEffect(() => {
    if (
      wssRef.current?.readyState === WebSocket.OPEN &&
      roomid &&
      hasJoinedRoom
    ) {
      wssRef.current.send(
        JSON.stringify({
          type: "join",
          payload: { roomId: roomid },
        })
      );
    }
  }, [roomid, hasJoinedRoom]);

  useEffect(() => {
    setTimeout(() => {
      chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);

  const normalize = (str) => str?.trim().toLowerCase();
  const selfUsername = normalize(username || "Anonymous");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white flex flex-col">
      {!hasJoinedRoom ? (
        // ---------- Join/Create Room Screen ----------
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 w-full max-w-md shadow-2xl">
            <div className="text-center mb-8">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-2">
                SecureChat
              </h1>
              <p className="text-gray-400">Connect securely in real-time</p>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">
                  Display Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className="space-y-4">
                <button
                  onClick={createRoomIdHandler}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 transform hover:scale-[1.02] shadow-lg cursor-pointer"
                >
                  <Plus className="w-5 h-5" />
                  Create New Room
                </button>

                {roomid && (
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-sm">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-gray-300">
                        Room ID
                      </span>
                      <button
                        onClick={copyRoomId}
                        className="text-blue-400 hover:text-blue-300 transition-colors duration-200 cursor-pointer"
                      >
                        {copiedRoomId ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                    <div className="bg-black/20 rounded-lg p-3 font-mono text-lg text-white text-center border border-white/10">
                      {roomid}
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <div className="h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent flex-1"></div>
                  <span className="text-gray-500 text-sm">or</span>
                  <div className="h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent flex-1"></div>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-300">
                    Join Existing Room
                  </label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                      <input
                        type="text"
                        placeholder="Room ID"
                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200"
                        value={roomid}
                        onChange={(e) =>
                          setRoomid(e.target.value.toUpperCase())
                        }
                      />
                    </div>
                    <button
                      onClick={joinRoomHandler}
                      disabled={!roomid.trim()}
                      className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 disabled:cursor-not-allowed cursor-pointer"
                    >
                      Join
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-center gap-2">
              {isConnected ? (
                <Wifi className="w-4 h-4 text-emerald-400" />
              ) : (
                <WifiOff className="w-4 h-4 text-red-400" />
              )}
              <span className="text-sm text-gray-400">
                {isConnected ? "Connected" : "Connecting..."}
              </span>
            </div>
          </div>
        </div>
      ) : (
        // ---------- Chat Room UI ----------
        <>
          {/* Header */}
          <div className="sticky top-0 bg-black/20 backdrop-blur-xl border-b border-white/10 p-4 z-20">
            <div className="max-w-4xl mx-auto flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 w-10 h-10 rounded-xl flex items-center justify-center shadow-lg">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    Room #{roomid}
                  </h1>
                  <p className="text-sm text-gray-400">
                    {username || "Anonymous"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={copyRoomId}
                  className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-3 py-2 rounded-lg flex items-center gap-2 transition-all duration-200 cursor-pointer"
                >
                  {copiedRoomId ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                  <span className="text-sm ">Copy Room-Id</span>
                </button>
                <div className="flex items-center gap-2">
                  {isConnected ? (
                    <Wifi className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <WifiOff className="w-4 h-4 text-red-400" />
                  )}
                  <span className="text-sm text-gray-400">
                    {isConnected ? "Online" : "Offline"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto">
            <div className="max-w-4xl mx-auto w-full p-4 pb-6 space-y-4">
              {messages.length === 0 ? (
                <div className="flex items-center justify-center h-96">
                  <div className="text-center">
                    <MessageCircle className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg">
                      Start the conversation
                    </p>
                    <p className="text-gray-600 text-sm mt-2">
                      Your messages will appear here
                    </p>
                  </div>
                </div>
              ) : (
                messages.map((msg, index) => {
                  const sender = normalize(msg.username || "Anonymous");
                  const isCurrentUser = sender === selfUsername;
                  const timestamp = msg.timestamp
                    ? new Date(msg.timestamp).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "";

                  return (
                    <div
                      key={index}
                      className={`flex ${
                        isCurrentUser ? "justify-end" : "justify-start"
                      } px-2`}
                    >
                      <div
                        className={`max-w-[75%] sm:max-w-[60%] ${
                          isCurrentUser ? "ml-10" : "mr-10"
                        }`}
                      >
                        <div
                          className={`rounded-2xl px-5 py-3 relative ${
                            isCurrentUser
                              ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg"
                              : "bg-white/5 text-white border border-white/10 backdrop-blur-sm"
                          }`}
                        >
                          {/* Message Text */}
                          <div className="text-sm sm:text-base leading-relaxed break-words whitespace-pre-wrap">
                            {msg.message}
                          </div>

                          {/* Footer: Username & Timestamp */}
                          <div className="h-full w-full flex items-center justify-between mt-3 text-xs text-gray-400">
                            <span className="font-medium text-gray-300 mr-4">
                              {isCurrentUser ? "You" : msg.username}
                            </span>
                            <span
                              className={
                                isCurrentUser
                                  ? "text-blue-100"
                                  : "text-gray-400"
                              }
                            >
                              {timestamp}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
              <div ref={chatBottomRef}></div>
            </div>
          </div>

          {/* Message Input */}
          <div className="sticky bottom-0 bg-black/20 backdrop-blur-xl border-t border-white/10 p-4 z-20">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white/5 rounded-2xl border border-white/10 p-4 backdrop-blur-sm">
                <div className="flex items-end gap-3">
                  <div className="flex-1">
                    <textarea
                      ref={messageInputRef}
                      value={currentMessage}
                      onChange={(e) => setCurrentMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type your message..."
                      className="w-full bg-transparent text-white placeholder-gray-500 resize-none focus:outline-none min-h-[24px] max-h-32 leading-relaxed"
                      rows={1}
                      onInput={(e) => {
                        e.target.style.height = "auto";
                        e.target.style.height = e.target.scrollHeight + "px";
                      }}
                    />
                  </div>
                  <button
                    onClick={sendMessage}
                    disabled={!currentMessage.trim()}
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-600 disabled:to-gray-700 text-white p-3 rounded-xl transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100 shadow-lg cursor-pointer"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
