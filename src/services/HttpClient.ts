import { Observable, throwError } from 'rxjs';
import { ajax, AjaxError, AjaxResponse } from 'rxjs/ajax';
import { catchError, map} from 'rxjs/operators';
import { buildRequestUrl, extractHeaders, removeCustomKeys } from './HttpHelper';
import type { RequesterConfig, RequestOptions } from './types';
// import { AppStore } from 'store';
// import { appActions } from 'store/app';

enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

//map the response to response.response
const mapResponse = map((x: AjaxResponse<any>) => x.response);


//support send request with headers
const sendHttpRequest = (url: string, options: RequestOptions, headers?: any): Observable<any> => {
  const ajaxRequest = removeCustomKeys(options);
  return ajax({ url, headers, ...ajaxRequest }).pipe(mapResponse);
};

const httpRequest = (url: string, options: RequestOptions): Observable<any> => {
  const mergedConfig: RequesterConfig = { includeJSONHeaders: true };
  const rUrl = buildRequestUrl(url, options.search);
  const rHeaders = extractHeaders(options, Boolean(mergedConfig.includeJSONHeaders));


  return sendHttpRequest(rUrl, options, rHeaders).pipe(
    catchError((error: AjaxError) => {
      if (error.status === 400) {
        // const { dispatch } = store;
        // dispatch(appActions.logout({}));
      }
      return throwError(() => error);
    })
  );
};


class HttpInterceptor {
  request(method: HttpMethod, url: string, body?: any, options?: RequestOptions) {
    return httpRequest(url, { ...options, method, body });
  }

  get(url: string, options?: RequestOptions): Observable<any> {
    return this.request(HttpMethod.GET, url, undefined, options);
  }

  post(url: string, body?: any, options?: RequestOptions): Observable<any> {
    return this.request(HttpMethod.POST, url, body, options);
  }

  put(url: string, body?: any, options?: RequestOptions): Observable<any> {
    return this.request(HttpMethod.PUT, url, body, options);
  }

  delete(url: string, options?: RequestOptions): Observable<any> {
    return this.request(HttpMethod.DELETE, url, undefined, options);
  }  
  
  upload(url: string, files: File[], additionalData: any = {}, options?: RequestOptions) {
    const formData = new FormData();
    if (files?.length) {
      for (const file of files) {
        formData.append('Photos', file, file.name);
      }
    }

    for (const key in additionalData) {
      if (additionalData[key]) {
        formData.append(key, additionalData[key]);
      }
    }

    return this.post(url, formData, {
      ...options,
      headers: {
        ...options?.headers,
      },
    });
  }
}

const HttpClient = new HttpInterceptor();
export default HttpClient;