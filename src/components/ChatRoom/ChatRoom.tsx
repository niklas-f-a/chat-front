import { ChatSection } from "./styled"
import { useAuth, useChatRooms } from "../../hooks"
import { useEffect, useState } from "react"
import { Socket, io } from "socket.io-client"

const socket = io('http://localhost:5050', {
    withCredentials: true,
    autoConnect: false,
  });

const ChatRoom = () => {
  const [message, setMessage] = useState('')
  const [isConnected, setIsConnected] = useState(false)
  const { user } = useAuth();
  const { currentRoom, addMessage } = useChatRooms();

  useEffect(() => {
    if (!user?._id) return;

    socket.connect()

    socket.on('connect', () => {
      setIsConnected(true)
      console.log('connected')
    })

    socket.on('received-message', (data) => {
      addMessage(data)
    });

    return () => {
      setIsConnected(false)
      socket.disconnect();
    };
  }, [user?._id]);

  if(!currentRoom || !isConnected) return <p>Not connected</p>

  const sendMessage = () => {
    socket.emit('send-message', { roomId: currentRoom.id, content: message});
  };

  return (
    <ChatSection>
      {currentRoom.messages.map(message => (
        <div key={message.id}>
          <p>{message.content}</p>
        </div>
      ))}
      <div style={{ position: "absolute", bottom: 0 }}>
        <input  type="text" onChange={e => setMessage(e.target.value)} />
        <button onClick={sendMessage}>send</button>
      </div>
    </ChatSection>
  )
}

export default ChatRoom