import { ChatBubbleLeftEllipsisIcon } from '@heroicons/react/24/outline';

export const ChatListRowSkeleton = () => {

    return (
        <a className={`chatRow flex relative py-3 px-3 items-center gap-3 rounded-md hover:bg-[#2A2B32] cursor-pointer `}>
            <ChatBubbleLeftEllipsisIcon className={'w-5 h-5 absolute animate-pulse'} />
            <div className='relative ml-8 overflow-hidden w-full animate-pulse'>
                <div className={'w-full h-3 bg-neutral-800 rounded-lg my-2'}></div>
            </div>
        </a>
    )
}
