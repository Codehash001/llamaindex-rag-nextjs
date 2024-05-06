import Image from "next/image";

export default function Sidebarheader() {
  return (
        <div className="w-full">
            <div className="px-4 py-2 w-full text-center flex items-center space-x-2 border-b-2">
            <Image
        className="rounded-md"
        src="/chatbot.png"
        alt="chatbot Logo"
        width={26}
        height={26}
        priority
      />
      <span className="font-mono font-semibold text-2xl text-[#31a4a2]">
      AI-Chatbot Demo
      </span>
            </div>
        </div>
  );
}
