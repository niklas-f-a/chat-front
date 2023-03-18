import { auth } from './auth.routes';
import { fetcher } from './Fetcher';

const authClient = fetcher({
  baseUrl: 'http://localhost:5001/api/v1/auth',
});

export const api = {
  auth: auth(authClient),
};
