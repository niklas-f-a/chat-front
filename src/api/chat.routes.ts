import { ChatRoom, ChatSpace } from '../context/types';
import { Fetcher } from './Fetcher';

export const chat = (fetcher: Fetcher) => ({
  getSpace: () => fetcher.get<ChatSpace[]>('/chat'),
  create: (chatRoomName: string) =>
    fetcher.post<ChatSpace>('/chat', { body: chatRoomName }),
  createSpace: (spaceName: string) =>
    fetcher.post<ChatRoom>(`/chat`, { body: { name: spaceName } }),
  getChatRoom: (id: string) => fetcher.get<ChatRoom>(`/chat/rooms/${id}`),
  joinSpace: (id: string) =>
    fetcher.post<ChatSpace>('/chat/join', { body: { chatSpaceId: id } }),
  getChatSpaceById: (spaceId: string) =>
    fetcher.get<ChatSpace>(`/chat/${spaceId}`),
});
