type FetcherTypes = {
  baseUrl: string;
  headers?: HeadersInit | undefined;
};

type ReqDetails = {
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
  post: <T>(endpoint: string, { body }: ReqDetails) => Promise<Response<T>>;
  del: <T>(endpoint: string, { body }: ReqDetails) => Promise<Response<T>>;
  update: <T>(endpoint: string, { body }: ReqDetails) => Promise<Response<T>>;
};

export const fetcher = ({
  baseUrl,
  headers = { 'Content-Type': 'application/json' },
}: FetcherTypes): Fetcher => {
  const fetchData = async (endPoint: string, reqDetails: ReqDetails) => {
    const { body, method } = reqDetails;

    const res = await fetch(baseUrl + endPoint, {
      method,
      headers,
      credentials: 'include',
      body: JSON.stringify(body),
    });
    const { status, ok } = res;
    const data = await res.json();

    return {
      status,
      ok,
      data,
    };
  };

  const get = (endpoint: string) => fetchData(endpoint, { method: 'GET' });

  const post = (endpoint: string, reqDetails: ReqDetails) =>
    fetchData(endpoint, { body: reqDetails?.body, method: 'POST' });

  const del = (endpoint: string, { body }: ReqDetails) =>
    fetchData(endpoint, { body, method: 'DELETE' });

  const update = (endpoint: string, { body }: ReqDetails) =>
    fetchData(endpoint, { body, method: 'PATCH' });

  return { get, post, del, update };
};
