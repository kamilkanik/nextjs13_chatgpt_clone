"use client";
import { useRef, useEffect, useState } from 'react'
import { ChatBubbleLeftEllipsisIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, deleteDoc, doc, orderBy, query } from '@firebase/firestore';
import { db } from '../../firebase';
import Link from 'next/link';

type ChatListRowType = {
    id: string;
}

export const ChatListRow = ({ id }: ChatListRowType) => {
    const {data: session} = useSession();
    const spanRef = useRef<HTMLSpanElement | null>(null);
    const pathname = usePathname();
    const router = useRouter();

    const [active, setActive] = useState(false);
    const [ isAnimated, setIsAnimated ] = useState(false);

    const [messages] = useCollection(
        query(
            collection(db, 'users', session?.user?.sub!, "chats", id, "messages"),
            orderBy("createdAt", "asc")
        )
    );

    useEffect(() => {
        const textWidth = spanRef.current?.offsetWidth;
        const parentWidth = spanRef.current?.parentElement?.offsetWidth;

        if(textWidth && parentWidth && textWidth > parentWidth){
            setIsAnimated(true);
        }
    }, [messages]);

    useEffect(() => {
        if(!pathname) return;

        setActive(pathname.includes(id));
    }, [pathname]);


    const removeChat = async () => {
        await deleteDoc(doc(db, 'users', session?.user?.sub!, 'chats', id));
        if(pathname && pathname.includes(id)){
            router.replace("/");
        }
    }

    return (
        <div className='relative flex items-center'>
        <Link 
            href={`/chats/${id}`}
            className={`
                chatRow
                ${isAnimated ? 'animate' : ''}
                ${active && 'bg-[#2A2B32]'}
                w-full flex relative py-3 px-3 items-center gap-3 rounded-md hover:bg-[#2A2B32] cursor-pointer whitespace-nowrap overflow-hidden break-all hover:pr-4
            `}
        >
            <ChatBubbleLeftEllipsisIcon className='w-5 h-5 absolute' />
            <div className='relative ml-8 overflow-hidden'>
                <span ref={spanRef}>{ messages?.docs[messages?.docs.length - 1]?.data().text || "New Chat" }</span>
            </div>
            { isAnimated && <div className='absolute inset-y-0 right-0 w-8 z-10 bg-gradient-to-l from-neutral-900 group-hover:from-[#2A2B32]'></div> }
        </Link>
        <TrashIcon className='w-5 h-5 absolute right-3 text-neutral-600 hover:text-red-500 transition-colors duration-150 z-50 cursor-pointer' onClick={() => { removeChat() }} />
        </div>
    )
}
