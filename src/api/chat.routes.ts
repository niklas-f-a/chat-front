import { Fetcher } from './Fetcher';
import { User, Credentials } from '../hooks/useAuth';

export const chat = (fetcher: Fetcher) => ({
  getRooms: () => fetcher.get('/status'),
});
