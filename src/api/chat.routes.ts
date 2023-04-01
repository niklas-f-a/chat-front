import { ChatSpace, ChatSpaces } from '../hooks/useChatRooms';
import { Fetcher } from './Fetcher';

export const chat = (fetcher: Fetcher) => ({
  getRooms: () => fetcher.get<ChatSpaces>('/chat'),
  create: (chatRoomName: string) =>
    fetcher.post<ChatSpace>('/chat', { body: chatRoomName }),
});
