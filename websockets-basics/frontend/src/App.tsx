import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [socket, setSocket] = useState<WebSocket>();
  const [msg, setMsg] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  function sendMsg() {
    if (socket && inputRef.current?.value) {
      socket.send(inputRef.current.value);
      inputRef.current.value = ""; // Clear input after sending
    }
  }

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");
    setSocket(ws);
    ws.onmessage = (e) => {
      setMsg(e.data);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
        <h1 className="text-xl font-bold mb-4 text-slate-700">
          WebSocket Chat
        </h1>

        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={sendMsg}
            className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
          >
            Send
          </button>
        </div>

        <div className="mt-6 text-slate-600">
          <strong>Server Response:</strong>
          <div className="mt-2 p-3 bg-slate-100 rounded-md border border-slate-200">
            {msg || "No message yet"}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
