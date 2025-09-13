import { Observable } from 'rxjs';
import { AjaxRequest, AjaxResponse } from 'rxjs/ajax';

export type StringKeyValue = {
  [key: string]: string;
};

export type RequestOptions = Partial<AjaxRequest> & {
  search?: StringKeyValue;
  headers?: StringKeyValue;
};

export type RequesterConfig = {
  log?: boolean;
  includeJSONHeaders?: boolean;
};

export type Requester = {
  request(url: string, options?: RequestOptions): Observable<AjaxResponse<any>>;
};


export type LoginRequest ={
    email: string;
    password: string;
}


export type TranslateRequest={
  input:string;
  origin:string;
  target:string;
};

export type TranslateResponse ={
  lang: {
    translatedText: string;
  };
};

export type SpeechRequest ={
  input: string;
  voice_id?: string;
  audio_format?:string;
  type:string;
};