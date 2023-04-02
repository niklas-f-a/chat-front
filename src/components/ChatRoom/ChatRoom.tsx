import { ChatSection } from "./styled"
import { useChatRooms, useSocket } from "../../hooks"

const ChatRoom = () => {
  const { chatRoom } = useChatRooms()
  const { data } = useSocket()
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