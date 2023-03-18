import { Fetcher } from './Fetcher';

export const auth = (fetcher: Fetcher) => ({
  signup(cred: { email: string; password: string }) {
    return fetcher.post('/signup', { body: cred });
  },
});
