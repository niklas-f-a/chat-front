import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { api } from '../api';
import useAuth, { User } from './useAuth';

export type Message = {
  id: string;
  content: string;
  userId: number;
  createdAt: Date;
  updateAt: Date;
};

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
  messages: Message[];
};

export type ChatRooms = ChatRoom[];

const useChatRooms = () => {
  const queryClient = useQueryClient();

  const { data: currentSpace } = useQuery<ChatSpace>(['currentSpace'], {
    enabled: false,
  });

  const { data: chatSpaces } = useQuery(['chatSpace'], {
    queryFn: getChatSpaces,
  });

  const { data: currentRoom } = useQuery<ChatRoom>(['currentRoom'], {
    enabled: false,
  });

  const { data: chatRoom } = useQuery<ChatRoom | undefined>(['messages'], {
    queryFn: getChatRoom,
    enabled: !!currentRoom?.id,
  });

  async function getChatSpaces() {
    const { data } = await api.chat.getSpace();

    return data;
  }

  async function getChatRoom() {
    if (!currentRoom) return undefined;
    console.log(currentRoom);
    const { data } = await api.chat.getChatRoom(currentRoom.id);
    console.log(data);
    return data;
  }

  // async function getChatRoom(aa: any) {
  //   console.log(aa);
  //   const { data } = await api.chat.getChatRoom();

  //   return data;
  // }

  // const createChatRoom = async ({ chatRoomName }: { chatRoomName: string }) => {
  //   const { data } = await api.chat.create(chatRoomName);

  //   return data;
  // };

  // const chatRoomMutation = useMutation(createChatRoom, {
  //   onSuccess: (data) => queryClient.setQueryData(['chatRooms'], data),
  // });

  function setCurrentSpace(clickedChatSpace: ChatSpace) {
    queryClient.setQueryData(['currentSpace'], clickedChatSpace);
  }

  function setCurrentRoom(clickedChatRoom: ChatRoom) {
    queryClient.setQueryData(['currentRoom'], clickedChatRoom);
  }

  return {
    chatSpaces,
    setCurrentSpace,
    currentSpace,
    setCurrentRoom,
    currentRoom,
    chatRoom,
  };
};

export default useChatRooms;
