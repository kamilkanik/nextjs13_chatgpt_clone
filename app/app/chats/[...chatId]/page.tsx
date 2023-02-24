import Chat from "../../../../components/Chat/Chat"
import ChatInput from "../../../../components/Chat/ChatInput"

type ChatPageType = {
    params: {
        chatId: string
    },
}
function ChatPage({params}: ChatPageType) {

    return (
        <div className="bg-slate-800 text-white w-full">
            <div className="mx-auto w-full flex flex-col justify-between h-full min-h-screen">
                <Chat chatId={params.chatId} />
                <ChatInput chatId={params.chatId} />
            </div>
        </div>
    )
}

export default ChatPage 