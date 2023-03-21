import { useQuery } from '@tanstack/react-query';
import { api } from '../api';

const useChatRooms = () => {
  const getChatRooms = async () => {
    const { data } = await api.chat.getRooms();
  };

  const { data: chatRooms } = useQuery(['chatRooms'], {
    queryFn: getChatRooms,
  });

  return { chatRooms };
};

export default useChatRooms;
