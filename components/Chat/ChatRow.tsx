import { DocumentData } from "@firebase/firestore";

type Props = {
  message: DocumentData
}

function ChatRow({message}: Props) {
  return (
    <div className="ChatRow">
      
      <div className="flex space-x-5 px-10 max-w-2xl mx-auto">
        <img src={message.user.avatar} alt="" className="h-8 w-8"/>
        <p className="pt-1 text-sm">{message.text}</p>
      </div>

    </div>
  )
}

export default ChatRow