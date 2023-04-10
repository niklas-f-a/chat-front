import { User } from '../hooks/useAuth';
import { Fetcher } from './Fetcher';

export const users = (fetcher: Fetcher) => ({
  find: (searchQuery: string) =>
    fetcher.get<User[]>(`/users/search?users=${searchQuery}`),
  acceptRequest: (requestId: string) =>
    fetcher.post('/users/friends/accept', { body: { requestId } }),
  sendFriendRequest: (receiver: string) =>
    fetcher.post('/users/friend-request', { body: { receiver } }),
});
