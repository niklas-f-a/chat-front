import { ChatRoom, ChatSpace, ChatSpaces } from '../hooks/useChatRooms';
import { Fetcher } from './Fetcher';

export const chat = (fetcher: Fetcher) => ({
  getSpace: () => fetcher.get<ChatSpaces>('/chat'),
  create: (chatRoomName: string) =>
    fetcher.post<ChatSpace>('/chat', { body: chatRoomName }),
  getChatRoom: (id: string) => fetcher.get<ChatRoom>(`/chat/rooms/${id}`),
});
