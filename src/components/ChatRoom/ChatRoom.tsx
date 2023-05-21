import { ChatSection } from "./styled"
import { useAuth, useChatRooms, useChat } from "../../hooks"
import { useContext, useEffect, useRef, useState } from "react"
import { StateContext } from "../../context";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../api";

const ChatRoom = () => {
  const chatSectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [message, setMessage] = useState('')
  const { user } = useAuth();
  const state = useContext(StateContext)
  const { findCurrentSpace } = useChatRooms()
  const {
    sendMessage,
    streamer,
    myPeerID
  } = useChat({ videoRef: videoRef.current, user, roomId: state?.currentRoomId })
  const isMySpace = state?.currentSpaceId === user?.personalSpace

  const { data: currentRoom } = useQuery(
    ['currentChatRoom'],
    {
      queryFn: getChatRoom,
      enabled: !!state?.currentRoomId,
    }
    );
  const roomId = currentRoom?.id ?? user?._id

  async function getChatRoom() {
    if(!state?.currentRoomId) return
    const { data } = await api.chat.getChatRoom(state.currentRoomId);

    return data;
  }

  useEffect(() => {
    const space = findCurrentSpace()
    if(!space) {
      state?.setCurrentRoomId('')
    } else {
      state?.setCurrentRoomId(space.chatRooms[0].id)
    }
  }, [state?.currentSpaceId])

  useEffect(() => {
    if(chatSectionRef.current){
      chatSectionRef.current.scrollTop = chatSectionRef.current.scrollHeight
    }
  }, [currentRoom?.messages])

  return (
    <div style={{ position: 'relative' }}>

      <ChatSection ref={chatSectionRef}>
        {currentRoom?.messages.map(message => (
          <div key={message.id}>
            <p>{message.content}</p>
          </div>
        ))}
      </ChatSection>
        <div style={{ position: "absolute", bottom: 0 }}>
          {/* <button onClick={watchStream}>Watch</button> */}
          {/* <button onClick={onStream}>stream</button> */}
          <video ref={videoRef} muted={true} width={300} height={300}></video>
          <input  type="text" onChange={e => setMessage(e.target.value)} />
          <button onClick={() => sendMessage(message)}>send</button>
        </div>

    </div>
  )



}
export default ChatRoom