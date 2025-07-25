export default function ChatBubble({ role, content }: { role: string, content: string }) {
  return (
    <div className={`my-2 p-3 rounded-2xl max-w-lg shadow ${role === "assistant" ? "bg-gray-100 ml-auto" : "bg-blue-100 mr-auto"}`}>
      <p className="text-sm">{content}</p>
    </div>
  );
}