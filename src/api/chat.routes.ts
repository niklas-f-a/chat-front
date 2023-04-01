import { Fetcher } from './Fetcher';

export const chat = (fetcher: Fetcher) => ({
  getRooms: () => fetcher.get('/status'),
  create: (chatRoomName: string) =>
    fetcher.post('/chat', { body: chatRoomName }),
});
