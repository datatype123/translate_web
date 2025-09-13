// import queryString from 'query-string';
import type { AjaxRequest } from 'rxjs/ajax';
import type { RequestOptions} from './types';


// const asQueryString = (parameters?: StringKeyValue): string => {
//   if (!parameters || Object.keys(parameters).length === 0) return '';

//   return `?${queryString.stringify(parameters)}`;
// };

export const buildRequestUrl = (baseUrl: string, searchParams?: Record<string, any>): string => {
  if (!searchParams) return baseUrl;

  const query = Object.entries(searchParams)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');

  return `${baseUrl}${baseUrl.includes('?') ? '&' : '?'}${query}`;
};

export const removeCustomKeys = (options: RequestOptions): Partial<AjaxRequest> => {
  const requestOptions: Partial<AjaxRequest> = {};

  for (const key in options) {
    if (key === 'search' || key === 'headers') continue;

    requestOptions[key as keyof AjaxRequest] =
      options[key as keyof AjaxRequest];
  }

  return requestOptions;
};

export const extractHeaders = (
  options: RequestOptions,
  addAcceptAndContentTypeJSON: boolean,
): RequestOptions['headers'] => {
  const { headers = {} } = options;

  if (!addAcceptAndContentTypeJSON) return headers;

  const keys = Object.keys(headers).map((key: string) => key.toLowerCase());
  const newHeaders = { ...headers };

  if (!keys.includes('accept')) {
    newHeaders['accept'] = 'application/json';
  }

  if (!keys.includes('content-type') && typeof options.body === 'string') {
    newHeaders['content-type'] = 'application/json';
  }

  return newHeaders;
};

