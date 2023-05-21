import { useCallback, useEffect, useRef, useState } from 'react';
import { Peer } from 'peerjs';
import { io } from 'socket.io-client';
import { Message } from '../context/types';
import { useQueryClient } from '@tanstack/react-query';
import { User } from './useAuth';

const socket = io('http://localhost:5050', {
  withCredentials: true,
  autoConnect: false,
});

type OwnProps = {
  videoRef: HTMLVideoElement | null;
  user: User | null | undefined;
  roomId: string | undefined;
};

type Props = OwnProps;

const useChat = ({ videoRef, user, roomId }: Props) => {
  const queryClient = useQueryClient();
  const [streamer, setStreamer] = useState('');
  const [stream, setStream] = useState<MediaStream>();
  // const [myPeer, setMyPeer] = useState<Peer | null>(null);
  let myPeer = useRef<Peer | null>(
    new Peer({ host: 'localhost', port: 9000, path: '/' })
  ).current;

  const [myPeerID, setMyPeerID] = useState<string | null>(
    () => myPeer?.id || null
  );

  const cleanUp = () => {
    if (myPeer) {
      myPeer.disconnect();
      myPeer.destroy();
    }
    myPeer = null;
    // setMyPeer(null);
    setMyPeerID(null);
  };

  useEffect(() => {
    if (!user?._id) return;

    socket.connect();

    socket.on('connect', () => {
      console.log('connected');
    });

    socket.on('received-message', (data) => {
      addMessage(data);
    });

    return () => {
      socket.off('received-message');
      socket.disconnect();
    };
  }, [user?._id]);

  useEffect(() => {
    if (roomId && videoRef && myPeer) {
      myPeer.on('open', (id) => {
        setMyPeerID(id);
      });

      myPeer.on('call', (call) => {
        console.log('calling' + call.peer);

        navigator.mediaDevices
          .getUserMedia({ audio: true, video: true })
          .then((stream) => {
            call.answer(stream);
          });

        call.on('stream', (remoteStream) => {
          videoRef.srcObject = remoteStream;
        });
      });

      socket.on('watch-stream', (id) => {
        setStreamer(id);
      });

      myPeer.on('disconnected', () => {
        console.log('Peer disconnected');
        cleanUp();
      });

      myPeer.on('close', () => {
        console.log('Peer closed remotetly');
        cleanUp();
      });

      myPeer.on('error', (error) => {
        console.log('peer error', error);
        cleanUp();
      });
    }
    return cleanUp;
  }, [roomId, videoRef, myPeer]);

  // const connectUser = (id: string) => {
  //   if (peer && stream) {
  //     const call = peer.call(id, stream);
  //   }
  // };

  const watchStream = () => {
    //   socket.emit('see-stream', { roomId, peerId: myPeerID });
  };

  const onStream = async () => {
    //   if (videoRef) {
    //     try {
    //       const captureStream = await navigator.mediaDevices.getDisplayMedia({
    //         video: true,
    //         audio: true,
    //       });
    //       setStream(captureStream);
    //       videoRef.srcObject = captureStream;
    //       videoRef.addEventListener('loadedmetadata', () => {
    //         videoRef.play();
    //       });
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   }
  };

  const sendMessage = (content: string) => {
    if (!roomId || !content) return;
    socket.emit('send-message', { roomId, content });
  };

  const addMessage = async (message: Message) => {
    await queryClient.setQueryData(['currentChatRoom'], (cacheData: any) => ({
      ...cacheData,
      messages: [...cacheData?.messages, message],
    }));
  };

  return { onStream, sendMessage, streamer, watchStream, myPeerID };
};

export default useChat;
