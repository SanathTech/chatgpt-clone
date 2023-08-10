"use client";

import { db } from "@/firebase";
import {
  DocumentData,
  QuerySnapshot,
  collection,
  orderBy,
  query,
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useCollection } from "react-firebase-hooks/firestore";
import Message from "./Message";
import { ArrowDownCircleIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef } from "react";

type Props = {
  chatId: string;
  onChange?: (messages: [QuerySnapshot<DocumentData> | undefined]) => void;
};

function Chat({ chatId, onChange }: Props) {
  const { data: session } = useSession();
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const [messages] = useCollection(
    session &&
      query(
        collection(
          db,
          "users",
          session?.user?.email!,
          "chats",
          chatId,
          "messages"
        ),
        orderBy("createdAt", "asc")
      )
  );

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView();
    onChange?.([messages]);
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto overflow-x-hidden">
      {messages?.empty && (
        <>
          <p className="mt-10 text-center text-white">
            Type a prompt in below to get started!
          </p>
          <ArrowDownCircleIcon className="h-10 w-10 mx-auto mt-5 text-white animate-bounce" />
        </>
      )}
      {messages?.docs.map((message) => (
        <Message key={message.id} message={message.data()} />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}

export default Chat;
