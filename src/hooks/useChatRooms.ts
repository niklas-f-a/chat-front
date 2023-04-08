import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useContext, useState } from 'react';
import { api } from '../api';
import useAuth, { User } from './useAuth';
import { ChatRoom, ChatSpace, Message } from '../context/types';
import { StateContext } from '../context';

const useChatRooms = () => {
  const queryClient = useQueryClient();
  const state = useContext(StateContext);

  const { data: chatSpaces } = useQuery<ChatSpace[]>(['chatSpace'], {
    queryFn: getChatSpaces,
  });

  const { data: currentRoom } = useQuery<ChatRoom | undefined>(
    ['chatRoom', state?.currentRoomId],
    {
      queryFn: getChatRoom,
      enabled: !!state?.currentRoomId,
    }
  );

  const joinSpaceMutation = useMutation(joinSpace, {
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['chatSpace'] }),
  });

  const chatSpaceMuation = useMutation(createSpace, {
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['chatSpace'] }),
  });

  async function getChatSpaces() {
    const { data } = await api.chat.getSpace();

    return data;
  }

  async function joinSpace(id: string) {
    const { data } = await api.chat.joinSpace(id);

    return data;
  }

  async function createSpace(spaceName: string) {
    const { data } = await api.chat.createSpace(spaceName);

    return data;
  }

  async function getChatRoom() {
    if (!state?.currentRoomId) return;
    const { data } = await api.chat.getChatRoom(state?.currentRoomId);
    return data;
  }

  const findCurrentSpace = () => {
    if (!state?.currentSpaceId) return;
    return chatSpaces?.find((space) => space.id === state?.currentSpaceId);
  };

  const addMessage = (message: Message) => {
    queryClient.setQueryData(
      ['chatRoom', state?.currentRoomId],
      (cacheData: any) => ({
        ...cacheData,
        messages: [...cacheData.messages, message],
      })
    );
  };

  // const createChatRoom = async ({ chatRoomName }: { chatRoomName: string }) => {
  //   const { data } = await api.chat.create(chatRoomName);

  //   return data;
  // };

  // const chatRoomMutation = useMutation(createChatRoom, {
  //   onSuccess: (data) => queryClient.setQueryData(['chatRooms'], data),
  // });

  return {
    addMessage,
    currentRoom,
    chatSpaces,
    chatSpaceMuation,
    findCurrentSpace,
    joinSpaceMutation,
  };
};

export default useChatRooms;
