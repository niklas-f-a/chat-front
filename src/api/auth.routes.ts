import { Fetcher } from './Fetcher';
import { User, Credentials } from '../hooks/useAuth';

export const auth = (fetcher: Fetcher) => ({
  signup: async (cred: Credentials) => {
    const { data, status } = await fetcher.post<User>('/auth/signup', {
      body: cred,
    });
    if (status !== 201) throw new Error('Something went wrong');
    return data;
  },
  login: async (cred: Credentials) => {
    const { data, status } = await fetcher.post<User>('/auth/login', {
      body: cred,
    });
    if (status !== 201) throw new Error('Something went wrong');
    return data;
  },
  status: () => fetcher.get<User>('/auth/status'),
});
