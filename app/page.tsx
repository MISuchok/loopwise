"use client";
import { useState } from "react";
import ChatBubble from "../components/ChatBubble";

export default function Home() {
  const [chat, setChat] = useState([{ role: "assistant", content: "Upload a PDF and ask a question!" }]);
  const [input, setInput] = useState("");

  async function sendMessage() {
    const newChat = [...chat, { role: "user", content: input }];
    setChat(newChat);
    setInput("");

    const res = await fetch("/api/gpt/route", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: newChat }),
    });
    const data = await res.json();
    setChat([...newChat, { role: "assistant", content: data.reply }]);
  }

  return (
    <main className="flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-4">Loopwise</h1>
      <div className="w-full max-w-xl flex flex-col space-y-2">
        {chat.map((msg, i) => <ChatBubble key={i} role={msg.role} content={msg.content} />)}
      </div>
      <div className="flex mt-4 w-full max-w-xl">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          className="flex-1 border p-2 rounded-l-xl"
        />
        <button onClick={sendMessage} className="bg-blue-500 text-white px-4 py-2 rounded-r-xl">Send</button>
      </div>
    </main>
  );
}