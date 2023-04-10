import { ChatSection } from "./styled"
import { useAuth, useChatRooms } from "../../hooks"
import { useContext, useEffect, useState } from "react"
import { Socket, io } from "socket.io-client"
import { FriendRequest, User } from "../../hooks/useAuth";
import { StateContext } from "../../context";

const socket = io('http://localhost:5050', {
    withCredentials: true,
    autoConnect: false,
  });

const MyChat = () => {
  const { user } = useAuth();

  const friends = user?.friendRequests.filter(friend => friend.established)

  const getFriend = (friend: FriendRequest) => {
    return user?._id === friend.receiver._id ? friend.requester : friend.receiver
  }

  return (
    <div>
      <h2>my chat</h2>
      {friends?.map(friend => {
        return <span key={friend._id}>{getFriend(friend).username}</span>
      })}
    </div>
  )
}

const ChatRoom = () => {
  const [message, setMessage] = useState('')
  const [isConnected, setIsConnected] = useState(false)
  const { user } = useAuth();
  const { currentRoom, addMessage } = useChatRooms();
  const state = useContext(StateContext)


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

  const isUserSpace = (user as User)?._id === state?.currentSpaceId

  if(!currentRoom || !isConnected) return <p>Not connected</p>

  const sendMessage = () => {
    const roomId = currentRoom?.id ?? user?._id
    socket.emit('send-message', { roomId: roomId, content: message});
  };


  return isUserSpace
    ? <MyChat />
    : (
      <ChatSection>
      {currentRoom?.messages.map(message => (
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