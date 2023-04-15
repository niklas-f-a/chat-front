import { ChatRoom, ChatSpace, PersonalSpace } from '../context/types';
import { Fetcher } from './Fetcher';

export const chat = (fetcher: Fetcher) => ({
  getSpace: () => fetcher.get<ChatSpace[]>('/chat'),
  create: (chatRoomName: string) =>
    fetcher.post<ChatSpace>('/chat', { body: chatRoomName }),
  createSpace: (spaceName: string) =>
    fetcher.post<ChatRoom>(`/chat`, { body: { name: spaceName } }),
  getChatRoom: (id: string) => fetcher.get<ChatRoom>(`/chat/rooms/${id}`),
  joinSpace: (id: string, userId: string) =>
    fetcher.post<ChatSpace>('/chat/join', {
      body: { chatSpaceId: id, userId },
    }),
  getChatSpaceById: (spaceId: string) =>
    fetcher.get<ChatSpace>(`/chat/${spaceId}`),
  getPersonalSpace: (id?: string) =>
    fetcher.get<PersonalSpace>(`/chat/personal/${id}`),
});
