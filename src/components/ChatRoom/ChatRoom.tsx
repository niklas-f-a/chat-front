import { ChatSection } from "./styled"
import { useAuth, useChatRooms } from "../../hooks"
import { useContext, useEffect, useRef, useState } from "react"
import { Socket, io } from "socket.io-client"
import { FriendRequest, User } from "../../hooks/useAuth";
import { StateContext } from "../../context";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../../api";
import { Message } from "../../context/types";

// const configuration = {
//   iceServers: [
//     {
//       urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302']
//     }
//   ],
//   iceCandidatePoolSize: 10,
// }

// let peerConnection = new RTCPeerConnection(configuration)

const socket = io('http://localhost:5050', {
    withCredentials: true,
    autoConnect: false,
  });

const ChatRoom = () => {
  const chatSectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const queryClient = useQueryClient();
  const [message, setMessage] = useState('')
  const [isConnected, setIsConnected] = useState(false)
  const [isStreaming, setIsStreaming] = useState(false)
  const [localStream, setLocalStream] = useState<MediaStream | null>(null)
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null)
  const { user } = useAuth();
  const state = useContext(StateContext)
  const { findCurrentSpace } = useChatRooms()
  const isYourSpace = state?.currentSpaceId === user?.personalSpace


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

  const addMessage = async (message: Message) => {
    await queryClient.setQueryData(['currentChatRoom'], (cacheData: any) => ({
        ...cacheData,
        messages: [...cacheData?.messages, message],
      })
    );
  };

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

  useEffect(() => {
    if (!user?._id) return;

    socket.connect()

    socket.on('connect', () => {
      setIsConnected(true)
      console.log('connected')
    })

    socket.on('received-message', (data) => {
      console.log(data);

      addMessage(data)
    });

    socket.on('stream-on', () => {
      setIsStreaming(true)
    });

    socket.on('stream-off', () => {
      setIsStreaming(false)
    })

    return () => {
      setIsConnected(false)
      socket.off('received-message')
      socket.disconnect();
    };
  }, [user?._id]);

  const closeStream = () => {
    setIsStreaming(false)
    if(videoRef.current){
      videoRef.current.srcObject = null
      localStream?.getTracks().forEach(track => track.stop())
    }
  }

  const streamVideo = async () => {
    // setIsStreaming(true)
    // const lStream = await navigator.mediaDevices.getUserMedia({
    //     video: true,
    //     audio: true,
    //   })

    // const rStream = new MediaStream()
    // setLocalStream(lStream)

    // lStream.getTracks().forEach(track => {
    //   peerConnection.addTrack(track, lStream)
    // })

    // peerConnection.ontrack = event => {
    //   event.streams[0].getTracks().forEach(track => {
    //     rStream.addTrack(track)
    //   })
    // }

    // if(videoRef.current !== null) {
    //   videoRef.current.srcObject = stream
    //   videoRef.current.addEventListener('loadedmetadata', () => {
    //     videoRef.current?.play()
    //     socket.emit('start-stream', roomId)
    //   })
    // }
  }


  const sendMessage = () => {

    socket.emit('send-message', { roomId: roomId, content: message});
  };

  const friends = user?.friendRequests.filter(friend => friend.established)

  const getFriend = (friend: FriendRequest) => {
    return user?._id === friend.receiver._id ? friend.requester : friend.receiver
  }

  return (
    <div style={{ position: 'relative' }}>
      {isYourSpace || !currentRoom
        ? (
          <div style={{ height: '100%' }}>
            <h2>my chat</h2>
            {state?.currentRoomId && currentRoom?.messages && currentRoom.messages.map(message => (
              <div key={message.id}>
                <p>{message.content}</p>
              </div>
            ))}
          </div>
        )
        : (
          <ChatSection ref={chatSectionRef}>
            {currentRoom?.messages && currentRoom.messages.map(message => (
              <div key={message.id}>
                <p>{message.content}</p>
              </div>
            ))}

        </ChatSection>
        )}
        <div style={{ position: "absolute", bottom: 0 }}>
          <video ref={videoRef} muted={true} width={300} height={300}></video>
          <button onClick={isStreaming ? closeStream : streamVideo}>{isStreaming ? 'close' : 'stream'}</button>
          <input  type="text" onChange={e => setMessage(e.target.value)} />
          <button onClick={sendMessage}>send</button>
        </div>

    </div>
  )



}
export default ChatRoom