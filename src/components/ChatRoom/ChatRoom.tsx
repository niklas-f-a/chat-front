import { useQuery } from "@tanstack/react-query"
import { ChatSection } from "./styled"
import { useChatRooms } from "../../hooks"

const ChatRoom = () => {
  const { chatRoom } = useChatRooms()
  if(!chatRoom?.messages) return null
  return (
    <ChatSection>
      {chatRoom.messages.map(message => (
        <div key={message.id}>
          <p>{message.content}</p>
        </div>
      ))}
    </ChatSection>
  )
}

export default ChatRoom