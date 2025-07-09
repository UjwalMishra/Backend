import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [messages, setMessages] = useState([]);
  const [wss, setWss] = useState();
  const [room, setRoom] = useState("red");
  const inputRef = useRef();

  function inputHandler() {
    const message = inputRef.current.value;
    wss.send(
      JSON.stringify({
        type: "chat",
        payload: {
          roomId: room,
          message: message,
        },
      })
    );
  }

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");
    setWss(ws);
    ws.onmessage = (event) => {
      setMessages((msg) => [...msg, event.data]);
    };

    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          type: "join",
          payload: {
            roomId: room,
          },
        })
      );
    };
  }, []);
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-gray-800">
      {/* create or join room  */}
      <div></div>
      <div className="h-[500px] w-[500px] flex flex-col p-6 bg-white rounded-2xl shadow-2xl">
        {/* Chat display area */}
        <div className="flex-1 overflow-y-auto pr-2">
          {messages.map((message, index) => (
            <div key={index} className="font-semibold m-2">
              <div className="bg-black text-white py-2 px-4 rounded-xl w-fit">
                {message}
              </div>
            </div>
          ))}
        </div>

        {/* Message input */}
        <div className="pt-4">
          <div className="w-full relative">
            <input
              type="text"
              placeholder="Type your message..."
              className="w-full bg-white px-4 py-3 pr-24 text-sm rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              ref={inputRef}
            />
            <button
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white text-sm px-6 py-2 rounded-full shadow-md transition cursor-pointer"
              onClick={inputHandler}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
