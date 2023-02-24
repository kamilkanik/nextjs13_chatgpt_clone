"use client";
import { collection, orderBy, query } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useCollection } from "react-firebase-hooks/firestore";
import ChatRow from "./ChatRow";
import { db } from "../../firebase";

type Props = {
    chatId: string;
}

import './Chat.css';

function Chat({chatId}: Props) {
  const { data: session } = useSession();

  const [messages, loading, error] = useCollection(
    query(
      collection(db, `users/${session?.user?.sub}/chats/${chatId}/messages`),
      orderBy("createdAt", "asc")
    )
  );


  return (
    <div>

        { messages?.docs.map((message) => (
            <ChatRow key={message.id} message={message.data()}/>
        )) }

    </div>
  )
}

export default Chat