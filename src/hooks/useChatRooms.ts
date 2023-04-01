import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { api } from '../api';
import useAuth, { User } from './useAuth';

export type ChatSpace = {
  chatRooms: ChatRooms;
  createdAt: Date;
  createdBy: Date;
  id: string;
  img: string | null; // defaulta
  updatedAt: Date;
  name: string;
};

export type ChatSpaces = ChatSpace[];

export type ChatRoom = {
  chatSpaceId: string;
  createdAt: Date;
  id: string;
  name: string;
  updatedAt: Date;
};

export type ChatRooms = ChatRoom[];

const useChatRooms = () => {
  // const [currentSpace, setCurrentSpace] = useState<ChatSpace | null>(null);
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { data: currentSpace } = useQuery<ChatSpace>(['currentSpace'], {
    enabled: false,
  });
  const { data: currentRoom } = useQuery<ChatRoom>(['currentRoom'], {
    enabled: false,
  });

  const getChatRooms = async () => {
    const { data } = await api.chat.getRooms();

    return data;
  };

  // const createChatRoom = async ({ chatRoomName }: { chatRoomName: string }) => {
  //   const { data } = await api.chat.create(chatRoomName);

  //   return data;
  // };

  // const chatRoomMutation = useMutation(createChatRoom, {
  //   onSuccess: (data) => queryClient.setQueryData(['chatRooms'], data),
  // });

  function setCurrentSpace(chatSpace: ChatSpace) {
    queryClient.setQueryData(['currentSpace'], chatSpace);
  }

  function setCurrentRoom(chatSpace: ChatRoom) {
    queryClient.setQueryData(['currentSpace'], chatSpace);
  }

  const { data: chatSpaces } = useQuery(['chatRooms'], {
    queryFn: getChatRooms,
  });

  return { chatSpaces, setCurrentSpace, currentSpace, setCurrentRoom };
};

export default useChatRooms;
