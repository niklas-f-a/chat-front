type FetcherTypes = {
  baseUrl: string;
  headers?: HeadersInit | undefined;
};

type QueryDetails = {
  body?: any;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
};

type Response<T> = {
  status: number;
  ok: boolean;
  data: T;
};

export type Fetcher = {
  get: <T>(endpoint: string) => Promise<Response<T>>;
  post: <T>(endpoint: string, { body }: QueryDetails) => Promise<Response<T>>;
  del: <T>(endpoint: string, { body }: QueryDetails) => Promise<Response<T>>;
  update: <T>(endpoint: string, { body }: QueryDetails) => Promise<Response<T>>;
};

export const fetcher = ({
  baseUrl,
  headers = { 'Content-Type': 'application/json' },
}: FetcherTypes): Fetcher => {
  const fetchData = async (
    endPoint: string,
    { body, method }: QueryDetails
  ) => {
    const res = await fetch(baseUrl + endPoint, {
      method,
      headers,
      credentials: 'include',
      body: JSON.stringify(body),
    });
    const { status, ok } = res;

    return {
      status,
      ok,
      data: await res.json(),
    };
  };

  const get = async (endpoint: string) =>
    await fetchData(endpoint, { method: 'GET' });

  const post = async (endpoint: string, { body }: QueryDetails) =>
    await fetchData(endpoint, { body, method: 'POST' });

  const del = async (endpoint: string, { body }: QueryDetails) =>
    await fetchData(endpoint, { body, method: 'DELETE' });

  const update = async (endpoint: string, { body }: QueryDetails) =>
    await fetchData(endpoint, { body, method: 'PATCH' });

  return { get, post, del, update };
};