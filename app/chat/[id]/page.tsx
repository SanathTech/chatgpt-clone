"use client";
import Chat from "@/components/Chat";
import ChatInput from "@/components/ChatInput";
import Menu from "@/components/Menu";
import SideBar from "@/components/SideBar";
import { db } from "@/firebase";
import {
  DocumentData,
  QuerySnapshot,
  collection,
  orderBy,
  query,
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";

type Props = {
  params: {
    id: string;
  };
};

function ChatPage({ params: { id } }: Props) {
  const { data: session } = useSession();
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<
    [QuerySnapshot<DocumentData> | undefined]
  >([undefined]);
  return (
    <div>
      {isSidebarOpen && (
        <div className="z-10 md:hidden absolute bg-[#202123] w-3/4 h-[100dvh]">
          <SideBar onChange={setIsSidebarOpen} />
        </div>
      )}
      <div className="inline md:hidden">
        <Menu onChange={setIsSidebarOpen} />
      </div>
      <div className="flex flex-col h-[calc(100dvh-37.33px)] md:h-screen overflow-hidden">
        <Chat chatId={id} onChange={setMessages} />
        <ChatInput chatId={id} messages={messages} />
      </div>
    </div>
  );
}

export default ChatPage;
