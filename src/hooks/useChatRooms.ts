import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '../api';
import { User } from './useAuth';

const useChatRooms = (user: User | null | undefined) => {
  const queryClient = useQueryClient();

  if (!user) return;

  const getChatRooms = async () => {
    const { data } = await api.chat.getRooms();
    return data;
  };

  const createChatRoom = async ({ chatRoomName }: { chatRoomName: string }) => {
    const { data } = await api.chat.create(chatRoomName);

    return data;
  };

  const chatRoomMutation = useMutation(createChatRoom, {
    onSuccess: (data) => queryClient.setQueryData(['chatRooms'], data),
  });

  const { data: chatRooms } = useQuery(['chatRooms'], {
    queryFn: getChatRooms,
  });

  return { chatRooms };
};

export default useChatRooms;
