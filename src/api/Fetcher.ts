type FetcherTypes = {
  baseUrl: string;
  headers?: HeadersInit | undefined;
};

type QueryDetails = {
  body?: any;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
};

export type Fetcher = {
  get: (endpoint: string) => void;
  post: (endpoint: string, { body }: QueryDetails) => Promise<Response>;
  del: (endpoint: string, { body }: QueryDetails) => void;
  update: (endpoint: string, { body }: QueryDetails) => void;
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
      body: JSON.stringify(body),
    });
    return await res.json();
  };

  const get = async <T>(endpoint: string) =>
    (await fetchData(endpoint, { method: 'GET' })) as T;

  const post = async <T>(endpoint: string, { body }: QueryDetails) =>
    (await fetchData(endpoint, { body, method: 'POST' })) as T;

  const del = async <T>(endpoint: string, { body }: QueryDetails) =>
    (await fetchData(endpoint, { body, method: 'DELETE' })) as T;

  const update = async <T>(endpoint: string, { body }: QueryDetails) =>
    (await fetchData(endpoint, { body, method: 'PATCH' })) as T;

  return { get, post, del, update };
};
