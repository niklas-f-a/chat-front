import { auth } from './auth.routes';
import { chat } from './chat.routes';
import { fetcher } from './Fetcher';

const fetchIns = fetcher({
  baseUrl: 'http://localhost:5001/api/v1',
});

export const api = {
  auth: auth(fetchIns),
  chat: chat(fetchIns),
};
