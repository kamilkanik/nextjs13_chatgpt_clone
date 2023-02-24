'use client';

import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { addDoc, collection, serverTimestamp, query, where, getDoc, getDocs, orderBy} from "firebase/firestore";
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from "../../firebase";

import { PlusSmallIcon, ArrowLeftOnRectangleIcon } from '@heroicons/react/20/solid';

import './SideBar.css';
import ChatList from "./ChatList";

function SideBar() {
    const router = useRouter();
    const { data: session } = useSession();

    const [chats, loading, error] = useCollection(
        session && query(collection(db, "users", session?.user?.sub!, 'chats'), orderBy("createdAt", "desc"))
    );
    
    const createNewChat = async () => {
        const doc = await addDoc(
            collection(db, 'users', session?.user?.sub!, 'chats'),
            {
                messages: [],
                createdAt: serverTimestamp()
            }
        );

        router.push(`/chats/${doc.id}`);
    }

    return (
        <div className='fixed p-2 flex flex-col h-screen bg-neutral-900 text-white w-full max-w-[260px]'>

            <div className='flex flex-col flex-1 gap-y-2'>

                {/* New Chat Button */}
                <button 
                    className='
                        flex 
                        w-full 
                        bg-neutral-900/50 hover:bg-neutral-800
                        p-2 
                        flex-row 
                        items-center 
                        text-white text-sm
                        border border-gray-500
                        rounded-md
                    '
                    onClick={() => {createNewChat()}}
                >
                    <PlusSmallIcon className='w-7 mr-2' />
                    New chat
                </button>

                <div>
                    {/* ModelSelection */}
                </div>

                {/* Map through the ChatRows */}
                {/* <div className='flex flex-col gap-y-2'>
                    <ChatRow value='How to create Shopify Application ?' />
                    <ChatRow value='Where can I buy Hogwart Legacy ?' />
                    <ChatRow value={`What's Joe Bidden second name ?`} />
                    <ChatRow value='Small Question ?' />
                </div> */}
                <ChatList loading={loading} chats={chats} error={error} />

                <div className='mt-auto'>
                    <button 
                        className='logOutButton flex flex-row items-center p-3 w-full hover:bg-[#2A2B32] rounded-md'
                        onClick={() => {
                            signOut();
                        }}
                    >
                        <ArrowLeftOnRectangleIcon className='logOutIcon w-6 mr-2' />
                        Log out
                    </button>
                </div>
            </div>

        </div>
    )
}

export default SideBar