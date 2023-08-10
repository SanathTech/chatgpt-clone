"use client";
import { db } from "@/firebase";
import { Bars3Icon, PlusIcon } from "@heroicons/react/24/solid";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type Props = {
  onChange?: (isSidebarOpen: boolean) => void;
};

function Menu({ onChange }: Props) {
  const router = useRouter();
  const { data: session } = useSession();
  const toggleMenu = () => {
    return onChange?.(true);
  };

  const createNewChat = async () => {
    const doc = await addDoc(
      collection(db, "users", session?.user?.email!, "chats"),
      {
        userId: session?.user?.email!,
        createdAt: serverTimestamp(),
      }
    );

    router.push(`/chat/${doc.id}`);
  };

  return (
    <div className="text-gray-300 text-sm flex items-center justify-between p-2 border-y-[1px] border-y-gray-600">
      <div onClick={toggleMenu} className="cursor-pointer">
        <Bars3Icon className="h-5" />
      </div>
      <div>New chat</div>
      <div onClick={createNewChat}>
        <PlusIcon className="h-5 w-5" />
      </div>
    </div>
  );
}

export default Menu;
