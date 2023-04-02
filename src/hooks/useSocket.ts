import { useEffect } from 'react';
import { io } from 'socket.io-client';
import useAuth from './useAuth';
import useChatRooms from './useChatRooms';

const useSocket = () => {
  const { user } = useAuth();

  const socket = io('http://localhost:5050', {
    withCredentials: true,
    autoConnect: false,
  });

  useEffect(() => {
    if (!user?._id) return;

    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, [user?._id]);

  return { data: 'hej' };
};

export default useSocket;
