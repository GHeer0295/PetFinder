import { SearchQuery, SearchResponse } from "./Search";

const API_BASE_URL = 'http://localhost:80';

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

type Req<TMethod extends Method, TQuery, TBody> = { query: TQuery } &
  (TMethod extends 'GET' ? { body?: never } : { body: TBody })

const createApiRequest = <
  TResponse extends Record<string, unknown>,
  TQuery extends Record<string, unknown>,
  TMethod extends Method = 'GET',
  TBody extends Record<string, unknown> = TMethod extends 'GET' ? never : Record<string, unknown>
>(
  { url, method }: { url: string, method: TMethod }
): (req: Req<TMethod, TQuery, TBody>) => Promise<TResponse> => {
  return async ({ body, query }: Req<TMethod, TQuery, TBody>) => {
    const stringQuery = Object.keys(query).reduce((q, key) => `${q}${key}=${query[key]}&`, '');
    const urlWithQuery = `${url}?${new URLSearchParams(stringQuery)}`;
    const res = await fetch(urlWithQuery, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: method !== 'GET' ? JSON.stringify(body) : undefined
    });
    return (await res.json() as Promise<TResponse>);
  };
};

/**
 * An object containing methods for sending requests to endpoints.
 */
export const Api = {
  search: createApiRequest<SearchResponse, SearchQuery, 'GET'>({
    method: 'GET',
    url: `${API_BASE_URL}/api/search`
  })
} as const;
