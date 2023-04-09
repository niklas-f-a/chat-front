import { User } from '../hooks/useAuth';
import { Fetcher } from './Fetcher';

export const users = (fetcher: Fetcher) => ({
  find: (searchQuery: string) =>
    fetcher.get<User[]>(`/users/search?users=${searchQuery}`),
});
