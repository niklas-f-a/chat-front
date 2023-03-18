// export class Fetcher {
//   constructor(private some: string){}

//   post(){

//   }

//   get(){

//   }

//   delete(){

//   }
// }
type FetcherTypes = {
  baseUrl: string;
  headers?: HeadersInit | undefined;
};

type QueryDetails = {
  body?: any;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
};

export type Fetcher = {
  get: (endpoint: string) => void;
  post: (endpoint: string, { body }: QueryDetails) => Promise<Response>;
  del: () => void;
  update: () => void;
};

export const fetcher = ({
  baseUrl,
  headers = { 'Content-Type': 'application/json' },
}: FetcherTypes): Fetcher => {
  const fetchData = async (
    endPoint = '',
    { body, method = 'GET' }: QueryDetails = {}
  ) => {
    const res = await fetch(baseUrl + endPoint, {
      method,
      headers,
      body: JSON.stringify(body),
    });
    return await res.json();
  };

  const get = (endpoint: string) => {
    fetchData(endpoint);
  };
  const post = async (endpoint: string, { body }: QueryDetails) => {
    return await fetchData(endpoint, { body, method: 'POST' });
  };
  const del = () => {};
  const update = () => {};

  return { get, post, del, update };
};
