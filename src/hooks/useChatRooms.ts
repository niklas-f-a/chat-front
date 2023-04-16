import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useContext, useState } from 'react';
import { api } from '../api';
import useAuth, { User } from './useAuth';
import { ChatRoom, ChatSpace, Message, PersonalSpace } from '../context/types';
import { StateContext } from '../context';

const useChatRooms = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const state = useContext(StateContext);

  const { data: chatSpaces } = useQuery<ChatSpace[]>(['chatSpace'], {
    queryFn: getChatSpaces,
  });

  const { data: personalSpace } = useQuery<PersonalSpace>(['personalSpace'], {
    queryFn: getPersonalChatSpace,
  });

  const joinSpaceMutation = useMutation(joinSpace, {
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['personalSpace'] }),
  });

  const chatSpaceMuation = useMutation(createSpace, {
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['chatSpace'] }),
  });

  async function getPersonalChatSpace() {
    const { data } = await api.chat.getPersonalSpace(user?.personalSpace);

    return data;
  }

  async function getChatSpaces() {
    const { data } = await api.chat.getSpace();

    return data;
  }

  async function joinSpace({ id, userId }: { id: string; userId: string }) {
    const { data } = await api.chat.joinSpace(id, userId);

    return data;
  }

  async function createSpace(spaceName: string) {
    const { data } = await api.chat.createSpace(spaceName);

    return data;
  }

  const findCurrentSpace = () => {
    if (!state?.currentSpaceId) return;
    return chatSpaces?.find((space) => space.id === state?.currentSpaceId);
  };

  return {
    chatSpaces,
    chatSpaceMuation,
    findCurrentSpace,
    joinSpaceMutation,
    personalSpace,
  };
};

export default useChatRooms;
