import { Fetcher } from './Fetcher';

export const auth = (fetcher: Fetcher) => ({
  signup: (cred: { email: string; password: string }) =>
    fetcher.post<{ _id: string }>('/signup', { body: cred }), // update return type
  login: (cred: { email: string; password: string }) =>
    fetcher.post<{ _id: string }>('/login', { body: cred }), // update return type
});
