'use client';
import { DocumentData, FirestoreError, QuerySnapshot } from "firebase/firestore";
import { ChatListRow } from "./ChatListRow"
import { ChatListRowSkeleton } from "./ChatListRowSkeleton"

type ChatListType = {
    chats?: QuerySnapshot<DocumentData>;
    loading: boolean;
    error?: FirestoreError;
}

function ChatList({chats, loading, error}: ChatListType) {
    return (
        <div className='flex flex-col gap-y-2'>
            { loading ? (
                <>
                    <ChatListRowSkeleton />
                    <ChatListRowSkeleton />
                    <ChatListRowSkeleton />
                </>
            ) : (<>
                { chats?.docs.map((chat) => <ChatListRow id={chat.id} key={chat.id} />) }
            </>) }
        </div>
    )
}

export default ChatList