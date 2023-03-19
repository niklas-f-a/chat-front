import { Fetcher } from './Fetcher';

export const auth = (fetcher: Fetcher) => ({
  signup: async (cred: { email: string; password: string }) =>
    fetcher.post('/signup', { body: cred }), // update return type
  login: (cred: { email: string; password: string }) =>
    fetcher.post('/login', { body: cred }), // update return type
  status: () => fetcher.get('/status'),
});
