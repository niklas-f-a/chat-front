import { ChatSection } from "./styled"
import { useAuth, useChatRooms } from "../../hooks"
import { useContext, useEffect, useRef, useState } from "react"
import { Socket, io } from "socket.io-client"
import { FriendRequest, User } from "../../hooks/useAuth";
import { StateContext } from "../../context";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../../api";
import { Message } from "../../context/types";

const socket = io('http://localhost:5050', {
    withCredentials: true,
    autoConnect: false,
  });

const ChatRoom = () => {
  const chatSectionRef = useRef<HTMLElement>(null)
  const queryClient = useQueryClient();
  const [message, setMessage] = useState('')
  const [isConnected, setIsConnected] = useState(false)
  const { user } = useAuth();
  const state = useContext(StateContext)

  const { data: currentRoom } = useQuery(
    ['currentChatRoom'],
    {
      queryFn: getChatRoom,
      cacheTime: Infinity,
      staleTime: Infinity,
      enabled: !!state?.currentRoomId,
    }
  );

  async function getChatRoom() {
    if(!state?.currentRoomId) return
    const { data } = await api.chat.getChatRoom(state.currentRoomId);

    return data;
  }

  const addMessage = async (message: Message) => {
    await queryClient.setQueryData(['currentChatRoom'], (cacheData: any) => ({
        ...cacheData,
        messages: [...cacheData?.messages, message],
      })
    );
  };

  useEffect(() => {
    if(chatSectionRef.current){
      chatSectionRef.current.scrollTop = chatSectionRef.current.scrollHeight
    }
  }, [currentRoom?.messages])


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
      socket.off('received-message')
      socket.disconnect();
    };
  }, [user?._id]);

  const isYourSpace = state?.currentSpaceId === user?.personalSpace

  const sendMessage = () => {
    const roomId = currentRoom?.id ?? user?._id
    socket.emit('send-message', { roomId: roomId, content: message});
  };

  const friends = user?.friendRequests.filter(friend => friend.established)

  const getFriend = (friend: FriendRequest) => {
    return user?._id === friend.receiver._id ? friend.requester : friend.receiver
  }

  return isYourSpace || !currentRoom
    ? (
      <div>
        <h2>my chat</h2>
        {friends?.map(friend => {
          return <span key={friend._id}>{getFriend(friend).username}</span>
        })}
      </div>
    )
    : (
      <ChatSection ref={chatSectionRef}>
      {currentRoom?.messages && currentRoom.messages.map(message => (
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